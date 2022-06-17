const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <>
        <p>Number of exercises {parts.reduce((added, part) => added + part.exercises, 0)}</p>
      </>
    )
  }
  
  const Part = (p) => {
    return (
      <>
        <p>
        {p.part.name} {p.part.exercises}
        </p>
      </>
    )
  }
  
  const Course = ({course}) => (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </>
  )

  export default Course