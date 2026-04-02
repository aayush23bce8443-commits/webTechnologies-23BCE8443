import React from "react";

import StudentProfile from "./Exercise1/StudentProfile";
import StudentCard from "./Exercise2/StudentCard";
import Counter from "./Exercise3/Counter";

function App() {
  return (
    <div>
      <h1>Lab 9 Exercises</h1>

      
      <StudentProfile />

      <hr />

      
      <h2>Exercise 2: Student Cards</h2>
      <StudentCard name="Raj" department="CSE" marks="85" />
      <StudentCard name="Anu" department="IT" marks="90" />
      <StudentCard name="Ravi" department="ECE" marks="78" />

      <hr />

    
      <Counter />
    </div>
  );
}

export default App;