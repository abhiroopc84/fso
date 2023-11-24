const Header = ({course}) => {
    return (
      <>
        <h2>{course}</h2>
      </>
    )
}
  
const Part = ({part}) => {
    return (
        <>
        <p>{part.name} {part.exercises}</p>
        </>
    )
}

const Content = ({parts}) => {
    return (
        <>
        {parts.map(part => <Part key={part.id} part={part}/>)}
        </>
    )
}

const Total = ({parts}) => {
    const sum = parts.reduce((s,p)=>s+p.exercises,0)
    return (
        <>
        <p><strong>total of {sum} exercises</strong></p>
        </>
    )
}

const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course