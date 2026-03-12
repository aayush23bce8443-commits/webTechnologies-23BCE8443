const studentName = "Alex Rivera";
const marks = [85, 92, 78, 95, 88];

let totalMarks = 0;
marks.forEach(mark => totalMarks += mark);

const calculateAverage = (total, count) => total / count;
const averageMarks = calculateAverage(totalMarks, marks.length);

console.log(`
----------------------------------
      STUDENT REPORT CARD
----------------------------------
Student Name : ${studentName}
Total Marks  : ${totalMarks}
Average Marks: ${averageMarks.toFixed(2)}
----------------------------------
`);