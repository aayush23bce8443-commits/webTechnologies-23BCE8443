class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }

  displayDetails() {
    console.log(`Course: ${this.courseName} | Instructor: ${this.instructor}`);
  }
}

const enrollStudent = (seatsAvailable) => {
  return new Promise((resolve, reject) => {
    if (seatsAvailable > 0) {
      resolve("Enrollment Successful");
    } else {
      reject("Course Full");
    }
  });
};

const myCourse = new Course("Web Development", "Dr. Sarah Smith");
myCourse.displayDetails();

const currentSeats = 5; 

enrollStudent(currentSeats)
  .then((message) => console.log(message))
  .catch((error) => console.log(error));