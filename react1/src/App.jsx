const Header = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((p, idx) => (
        <>
          <h2 key={idx}>{p.name}</h2>
          <p>{p.exercises}</p>
        </>
      ))}
    </div>
  )
}

const Tools = ({parts}) => {
  const total = parts.map((p) => p.exercises).reduce((x, y) => x+y);
  return (
    <div>
      <h2>Total exercises</h2>
      {total}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Tools parts={course.parts}/>
    </div>
  )
}

export default App