import React from "react";

function StudentCard({ name, department, marks }) {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h3>Student Card</h3>
      <p>Name: {name}</p>
      <p>Department: {department}</p>
      <p>Marks: {marks}</p>
    </div>
  );
}

export default StudentCard;