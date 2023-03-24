const Header = ({ text }) => <h2>{text}</h2>

const Total = ({ parts }) =>
  <p style={{fontWeight: "bold"}}>
    total of {parts.reduce((acc, val) => acc + val.exercises, 0)} exercises
  </p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </>

const Course = ({ course }) =>
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course