
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
  
  export default Course
  