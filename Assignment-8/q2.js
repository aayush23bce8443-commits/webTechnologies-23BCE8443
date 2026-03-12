const student = {
  id: 101,
  name: "Sophia Chen",
  department: "Computer Science",
  marks: 92
};

const { id, name, department, marks } = student;

console.log("--- Student Details ---");
console.log(`ID: ${id}`);
console.log(`Name: ${name}`);
console.log(`Dept: ${department}`);
console.log(`Marks: ${marks}`);

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "D";
};

const updatedStudent = {
  ...student,
  grade: getGrade(student.marks)
};

console.log("\n--- Updated Student Object ---");
console.log(updatedStudent);