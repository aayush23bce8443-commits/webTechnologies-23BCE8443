// 1. Survey Definition (Data Structure)
const surveyQuestions = [
    { id: "q1", type: "text", label: "Full Name", required: true, minLength: 3 },
    { id: "q2", type: "radio", label: "How did you hear about us?", options: ["Social Media", "Friend", "Advertisement"], required: true },
    { id: "q3", type: "checkbox", label: "Which services do you use?", options: ["Consulting", "Software", "Support"], minSelect: 2 },
    { id: "q4", type: "text", label: "Briefly describe your goals (Max 50 chars)", required: false, maxLength: 50 }
];

const container = document.getElementById('surveyContainer');

// 2. Generate Form Fields
surveyQuestions.forEach(q => {
    const block = document.createElement('div');
    block.className = 'question-block';
    block.id = `block-${q.id}`;

    const label = document.createElement('label');
    label.innerText = q.label + (q.required ? " *" : "");
    block.appendChild(label);

    // Text Input Logic
    if (q.type === "text") {
        const input = document.createElement('input');
        input.type = "text";
        input.id = q.id;
        block.appendChild(input);
    } 
    // Radio & Checkbox Logic
    else if (q.type === "radio" || q.type === "checkbox") {
        const group = document.createElement('div');
        group.className = "options-group";
        q.options.forEach(opt => {
            const optLabel = document.createElement('label');
            const input = document.createElement('input');
            input.type = q.type;
            input.name = q.id;
            input.value = opt;
            optLabel.appendChild(input);
            optLabel.append(opt);
            group.appendChild(optLabel);
        });
        block.appendChild(group);
    }

    // Validation Feedback Span
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-text';
    errorMsg.id = `error-${q.id}`;
    block.appendChild(errorMsg);

    container.appendChild(block);
});

// 3. Validation Engine
function validate() {
    let isValidForm = true;

    surveyQuestions.forEach(q => {
        const block = document.getElementById(`block-${q.id}`);
        const error = document.getElementById(`error-${q.id}`);
        let questionValid = true;
        let message = "";

        if (q.type === "text") {
            const val = document.getElementById(q.id).value.trim();
            if (q.required && val === "") {
                questionValid = false;
                message = "This field is mandatory.";
            } else if (q.minLength && val.length > 0 && val.length < q.minLength) {
                questionValid = false;
                message = `Must be at least ${q.minLength} characters.`;
            } else if (q.maxLength && val.length > q.maxLength) {
                questionValid = false;
                message = `Cannot exceed ${q.maxLength} characters.`;
            }
        } 
        else if (q.type === "radio") {
            const selected = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !selected) {
                questionValid = false;
                message = "Please select one option.";
            }
        }
        else if (q.type === "checkbox") {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.minSelect && checkedCount < q.minSelect) {
                questionValid = false;
                message = `Please select at least ${q.minSelect} options.`;
            }
        }

        // DOM Manipulation for Errors
        if (!questionValid) {
            block.classList.add('invalid');
            error.innerText = message;
            error.style.display = "block";
            isValidForm = false;
        } else {
            block.classList.remove('invalid');
            error.style.display = "none";
        }
    });

    return isValidForm;
}

// 4. Form Submission Handler
document.getElementById('surveyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
        alert("Success! Your survey data has been captured.");
        console.log("Submitting logic would go here...");
    }
});