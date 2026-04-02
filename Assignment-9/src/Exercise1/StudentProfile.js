import React from "react";

function StudentProfile() {
  const name = "Raj";
  const department = "CSE";
  const year = "3rd Year";
  const section = "A";

  return (
    <div>
      <h2>Exercise 1: Student Profile</h2>
      <p>Name: {name}</p>
      <p>Department: {department}</p>
      <p>Year: {year}</p>
      <p>Section: {section}</p>
    </div>
  );
}

export default StudentProfile;