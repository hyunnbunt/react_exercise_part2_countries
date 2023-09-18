const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({course}) => {
  return (
      <>
          <h1>
              {course.name}
          </h1>
      </>
  )
}

const Content = ({parts}) => {
  return (
  <>
    {parts.map(
      part => <Part key={part.id} part={part} /> 
    )}
  </>
  )
}

const Part = ({part}) => {
  console.log(part.name, part.exercises)
  return (
    <div>{part.name} {part.exercises}</div>
  )
}
const Total = ({parts}) => {
  const total = 0
  {parts.map(
    part => total = total + part.exercises)}
  return (
    <>
      total of {total} exercises
    </>
    )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }
return <Course course={course} />

}

export default App