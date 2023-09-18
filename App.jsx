const Courses = ({courses}) => {
  return (
    <>
      {courses.map(
        course => 
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

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
    <h2>
        {course.name}
    </h2>
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
  return (
    <div>{part.name} {part.exercises}</div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce(function(total, part) { return total + part.exercises}, 0)
  return (
    <div>total of {total} exercises</div>
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
  return (
    <>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </>
  )

}

export default App