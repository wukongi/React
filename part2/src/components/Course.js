import React from "react";

const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => (
        <div key={course.id}>
          <h2 key={course.id}> {course.name}</h2>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          ))}
          <h3>
            Total of &nbsp;
            {course.parts.reduce((total, part) => {
              return (total += part["exercises"]);
            }, 0)}
            &nbsp;exerciese
          </h3>
        </div>
      ))}
    </>
  );
};

export default Course;
