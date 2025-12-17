const Header = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <h2>Name: {part.name}</h2>
      <p>Exercises: {part.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((p, idx) => (
        <Part key={p.id} part={p}/>
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

export const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Tools parts={course.parts}/>
    </div>
  )
}

