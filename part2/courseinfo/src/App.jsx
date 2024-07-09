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
  return <h1>{course}</h1>
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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return courses.map(course=><Course course={course} />)
}

export default App