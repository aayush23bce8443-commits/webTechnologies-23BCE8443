const API = "http://localhost:3000/notes";


function addNote() {

    const note = {
        title: document.getElementById("title").value,
        subject: document.getElementById("subject").value,
        description: document.getElementById("description").value
    };

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(res => res.json())
    .then(() => {
        loadNotes();
    });
}



function loadNotes() {

    fetch(API)
    .then(res => res.json())
    .then(data => {

        let output = "";

        data.forEach(note => {

            output += `
            <div>
                <h3>${note.title}</h3>
                <p>${note.subject}</p>
                <p>${note.description}</p>

                <button onclick="deleteNote('${note._id}')">Delete</button>

                <button onclick="updateNote('${note._id}')">Edit</button>

                <hr>
            </div>
            `;
        });

        document.getElementById("notes").innerHTML = output;
    });
}


function updateNote(id) {

    const title = prompt("Enter new title");
    const description = prompt("Enter new description");

    fetch(API + "/" + id, {

        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            description: description
        })

    })
    .then(res => res.json())
    .then(() => loadNotes());
}




function deleteNote(id) {

    fetch(API + "/" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => loadNotes());
}



loadNotes();