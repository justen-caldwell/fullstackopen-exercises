const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
const Total = ({ total }) => <b>total of {total} exercises</b>

const Content = ({ parts }) => {
  console.log(parts)
  return (
    parts.map(part => 
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )
  )
}

const Course = ({ course }) => {
  console.log('Course', course)
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course
