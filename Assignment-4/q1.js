const usernameInput = document.getElementById("username");
const feedback = document.getElementById("feedback");
const loading = document.getElementById("loading");
const form = document.getElementById("registrationForm");

let isAvailable = false;

usernameInput.addEventListener("input", function () {
    const username = usernameInput.value.trim();

    if (username === "") {
        feedback.textContent = "";
        return;
    }

    loading.style.display = "block";
    feedback.textContent = "";

    
    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            loading.style.display = "none";

            if (data.usernames.includes(username)) {
                feedback.textContent = "Username already taken";
                feedback.className = "taken";
                isAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.className = "available";
                isAvailable = true;
            }
        })
        .catch(error => {
            loading.style.display = "none";
            feedback.textContent = "Error checking username";
            feedback.className = "taken";
            isAvailable = false;
        });
});


form.addEventListener("submit", function (event) {
    if (!isAvailable) {
        event.preventDefault();
        alert("Please choose a different username.");
    } else {
        alert("Registration successful!");
    }
});