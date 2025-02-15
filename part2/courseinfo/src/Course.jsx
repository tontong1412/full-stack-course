const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}
const Content = ({parts}) => {
  return <div>
    {
      parts.map(part=><Part key={part.id} part={part}/>)
    }
  </div>
}

const Header = ({course}) => {
  return <h2>{course}</h2>
}

const Total = ({parts}) => {
  const total = parts.reduce((prev, curr)=>prev + curr.exercises, 0)
  return <p><strong>total of {total} exercise</strong>s</p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
} 

export default Course