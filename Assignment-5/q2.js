let xmlDoc;


function loadBooks() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (this.status === 200) {
            xmlDoc = this.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML file!", "error");
                return;
            }

            displayBooks();
            showMessage("Books loaded successfully!", "success");
        } else {
            showMessage("Error loading XML file!", "error");
        }
    };

    xhr.send();
}


function displayBooks() {
    let tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";

    let books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No books found!", "error");
        return;
    }

    for (let i = 0; i < books.length; i++) {
        let row = tableBody.insertRow();

        row.insertCell(0).innerText =
            books[i].getElementsByTagName("id")[0].textContent;

        row.insertCell(1).innerText =
            books[i].getElementsByTagName("title")[0].textContent;

        row.insertCell(2).innerText =
            books[i].getElementsByTagName("author")[0].textContent;

        row.insertCell(3).innerText =
            books[i].getElementsByTagName("status")[0].textContent;
    }
}


function validateInput(id, title, author, status) {
    if (!id) {
        showMessage("Book ID is required!", "error");
        return false;
    }
    return true;
}


function addBook() {
    let id = document.getElementById("bookId").value.trim();
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();
    let status = document.getElementById("bookStatus").value;

    if (!validateInput(id, title, author, status)) return;

    let books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", "error");
            return;
        }
    }

    let newBook = xmlDoc.createElement("book");

    let idNode = xmlDoc.createElement("id");
    idNode.appendChild(xmlDoc.createTextNode(id));

    let titleNode = xmlDoc.createElement("title");
    titleNode.appendChild(xmlDoc.createTextNode(title));

    let authorNode = xmlDoc.createElement("author");
    authorNode.appendChild(xmlDoc.createTextNode(author));

    let statusNode = xmlDoc.createElement("status");
    statusNode.appendChild(xmlDoc.createTextNode(status || "Available"));

    newBook.appendChild(idNode);
    newBook.appendChild(titleNode);
    newBook.appendChild(authorNode);
    newBook.appendChild(statusNode);

    xmlDoc.documentElement.appendChild(newBook);

    displayBooks();
    showMessage("Book added successfully!", "success");
}


function updateBook() {
    let id = document.getElementById("bookId").value.trim();
    let status = document.getElementById("bookStatus").value;

    if (!id || !status) {
        showMessage("Book ID and Status required!", "error");
        return;
    }

    let books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].getElementsByTagName("status")[0].textContent = status;
            displayBooks();
            showMessage("Book status updated!", "success");
            return;
        }
    }

    showMessage("Book not found!", "error");
}


function deleteBook() {
    let id = document.getElementById("bookId").value.trim();

    if (!id) {
        showMessage("Book ID required!", "error");
        return;
    }

    let books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            xmlDoc.documentElement.removeChild(books[i]);
            displayBooks();
            showMessage("Book deleted successfully!", "success");
            return;
        }
    }

    showMessage("Book not found!", "error");
}


function showMessage(msg, type) {
    let message = document.getElementById("message");
    message.innerText = msg;
    message.style.color = type === "success" ? "green" : "red";
}