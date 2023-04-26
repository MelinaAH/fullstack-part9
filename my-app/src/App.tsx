import React from 'react';
import './App.css';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    courseName: string;
  }

  const Header = (props: HeaderProps) => {
    return (<h1>{props.courseName}</h1>)
  };

  interface ContentProps {
    courseParts: ContentPart[];
  }

  interface ContentPart {
    name: string;
    exerciseCount: number;
  }

  const Content = (props: ContentProps) => {
    return (
      <>
        {props.courseParts.map((part) => (
          <p key={part.name}>{part.name} {part.exerciseCount}</p>
        ))}
      </>
    )
  };

  const Total = (props: ContentProps) => {
    return (
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
