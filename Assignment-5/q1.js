let xmlDoc;


function loadEmployees() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function () {
        if (this.status == 200) {
            xmlDoc = this.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML file!", "error");
                return;
            }

            displayEmployees();
            showMessage("Employees loaded successfully!", "success");
        } else {
            showMessage("Error loading XML file!", "error");
        }
    };

    xhr.send();
}


function displayEmployees() {
    let tableBody = document.querySelector("#employeeTable tbody");
    tableBody.innerHTML = "";

    let employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length == 0) {
        showMessage("No employees found!", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        let row = tableBody.insertRow();

        row.insertCell(0).innerText =
            employees[i].getElementsByTagName("id")[0].textContent;

        row.insertCell(1).innerText =
            employees[i].getElementsByTagName("name")[0].textContent;

        row.insertCell(2).innerText =
            employees[i].getElementsByTagName("department")[0].textContent;

        row.insertCell(3).innerText =
            employees[i].getElementsByTagName("salary")[0].textContent;
    }
}


function addEmployee() {
    if (!xmlDoc) {
        showMessage("Load XML first!", "error");
        return;
    }

    let id = document.getElementById("empId").value;
    let name = document.getElementById("empName").value;
    let dept = document.getElementById("empDept").value;
    let salary = document.getElementById("empSalary").value;

    let newEmployee = xmlDoc.createElement("employee");

    let idNode = xmlDoc.createElement("id");
    idNode.appendChild(xmlDoc.createTextNode(id));

    let nameNode = xmlDoc.createElement("name");
    nameNode.appendChild(xmlDoc.createTextNode(name));

    let deptNode = xmlDoc.createElement("department");
    deptNode.appendChild(xmlDoc.createTextNode(dept));

    let salaryNode = xmlDoc.createElement("salary");
    salaryNode.appendChild(xmlDoc.createTextNode(salary));

    newEmployee.appendChild(idNode);
    newEmployee.appendChild(nameNode);
    newEmployee.appendChild(deptNode);
    newEmployee.appendChild(salaryNode);

    xmlDoc.documentElement.appendChild(newEmployee);

    displayEmployees();
    showMessage("Employee added successfully!", "success");
}


function updateEmployee() {
    let id = document.getElementById("empId").value;
    let dept = document.getElementById("empDept").value;
    let salary = document.getElementById("empSalary").value;

    let employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        let empId = employees[i].getElementsByTagName("id")[0].textContent;

        if (empId == id) {
            if (dept)
                employees[i].getElementsByTagName("department")[0].textContent = dept;

            if (salary)
                employees[i].getElementsByTagName("salary")[0].textContent = salary;

            displayEmployees();
            showMessage("Employee updated successfully!", "success");
            return;
        }
    }

    showMessage("Employee not found!", "error");
}


function deleteEmployee() {
    let id = document.getElementById("empId").value;
    let employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        let empId = employees[i].getElementsByTagName("id")[0].textContent;

        if (empId == id) {
            xmlDoc.documentElement.removeChild(employees[i]);
            displayEmployees();
            showMessage("Employee deleted successfully!", "success");
            return;
        }
    }

    showMessage("Employee not found!", "error");
}


function showMessage(msg, type) {
    let message = document.getElementById("message");
    message.innerText = msg;

    if (type == "success")
        message.style.color = "green";
    else
        message.style.color = "red";
}