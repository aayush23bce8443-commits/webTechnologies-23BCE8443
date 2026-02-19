let students = [];


function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.json(); 
        })
        .then(data => {
            students = data;
            displayStudents();
            showMessage("Students loaded successfully!", "success");
        })
        .catch(error => {
            showMessage("Error loading JSON file!", "error");
        });
}


function displayStudents() {
    let tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    if (students.length === 0) {
        showMessage("No students found!", "error");
        return;
    }

    students.forEach(student => {
        let row = tableBody.insertRow();

        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.course;
        row.insertCell(3).innerText = student.marks;
    });
}


function validateInput(id, name, course, marks) {
    if (!id || !name || !course || !marks) {
        showMessage("All fields are required!", "error");
        return false;
    }
    return true;
}


function addStudent() {
    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("studentName").value.trim();
    let course = document.getElementById("studentCourse").value.trim();
    let marks = document.getElementById("studentMarks").value.trim();

    if (!validateInput(id, name, course, marks)) return;

    if (students.some(student => student.id === id)) {
        showMessage("Student ID already exists!", "error");
        return;
    }

    students.push({ id, name, course, marks: Number(marks) });

    displayStudents();
    showMessage("Student added successfully!", "success");
}


function updateStudent() {
    let id = document.getElementById("studentId").value.trim();
    let course = document.getElementById("studentCourse").value.trim();
    let marks = document.getElementById("studentMarks").value.trim();

    let student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student not found!", "error");
        return;
    }

    if (course) student.course = course;
    if (marks) student.marks = Number(marks);

    displayStudents();
    showMessage("Student updated successfully!", "success");
}


function deleteStudent() {
    let id = document.getElementById("studentId").value.trim();

    let index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student not found!", "error");
        return;
    }

    students.splice(index, 1);

    displayStudents();
    showMessage("Student deleted successfully!", "success");
}


function showMessage(msg, type) {
    let message = document.getElementById("message");
    message.innerText = msg;
    message.style.color = type === "success" ? "green" : "red";
}