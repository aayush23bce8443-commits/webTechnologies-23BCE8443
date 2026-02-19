const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = []; 


function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}


function simulateServer(data, status = 200) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 200) {
                resolve({ status: 200, json: () => Promise.resolve(data) });
            } else {
                reject({ status: status });
            }
        }, 500);
    });
}


function fetchStudents() {
    simulateServer(students, 200)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error("Error fetching data");
        })
        .then(data => {
            table.innerHTML = "";
            data.forEach(student => addRow(student));
        })
        .catch(() => showMessage("Error loading students (500)", "error"));
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const dept = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    const existing = students.find(s => s.id === id);

    if (existing) {
        
        existing.name = name;
        existing.department = dept;
        existing.marks = marks;
        simulateServer(existing, 200)
            .then(() => {
                showMessage("Student Updated (200)", "success");
                fetchStudents();
            });
    } else {
        
        const newStudent = { id, name, department: dept, marks };
        students.push(newStudent);

        simulateServer(newStudent, 200)
            .then(() => {
                showMessage("Student Added (200)", "success");
                fetchStudents();
            });
    }

    form.reset();
});


function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student Not Found (404)", "error");
        return;
    }

    students.splice(index, 1);

    simulateServer({}, 200)
        .then(() => {
            showMessage("Student Deleted (200)", "success");
            fetchStudents();
        })
        .catch(() => showMessage("Delete Failed (500)", "error"));
}


function addRow(student) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.department}</td>
        <td>${student.marks}</td>
        <td>
            <button onclick="editStudent('${student.id}')">Edit</button>
            <button onclick="deleteStudent('${student.id}')">Delete</button>
        </td>
    `;

    table.appendChild(row);
}


function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student Not Found (404)", "error");
        return;
    }

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;
}


fetchStudents();