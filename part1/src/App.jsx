const Part = ({part}) => {
  return <p>{part.name} {part.exercise}</p>
}
const Content = ({parts}) => {
  return <div>
    <Part part={parts[0]}/>
    <Part part={parts[1]}/>
    <Part part={parts[2]}/>
  </div>
}

const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Total = ({parts}) => {
  const total = parts[0].exercise + parts[1].exercise + parts[2].exercise
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App