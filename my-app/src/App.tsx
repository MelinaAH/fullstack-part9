import React from 'react';
import './App.css';

const App = () => {
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    kind: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartRequirements extends CoursePartBase {
    requirements: string[];
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase, CoursePartDescription, CoursePartRequirements {
    kind: "special";
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  interface HeaderProps {
    courseName: string;
  }

  const Header = (props: HeaderProps) => {
    return (<h1>{props.courseName}</h1>)
  };

  interface ContentProps {
    courseParts: CoursePart[];
  }

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case 'basic':
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
          </div>
        )
      case 'group':
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        )
      case 'background':
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
            <p>submit to {part.backgroundMaterial}</p>
          </div>
        )
      case 'special':
        return (
          <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
            <p>required skills: {part.requirements.join(", ")}</p>
          </div>
        )
      default:
        return null;
    }
  };

  const Content = (props: ContentProps) => {
    return (
      <>
        {props.courseParts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </>
    )
  };

  const Total = (props: ContentProps) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>

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
