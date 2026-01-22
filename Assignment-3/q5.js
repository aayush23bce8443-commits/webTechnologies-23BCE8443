let currentStep = 1;
const totalSteps = 4;
const formData = {}; 

function updateUI() {
    
    document.querySelectorAll('.form-stage').forEach((stage, index) => {
        stage.style.display = (index + 1 === currentStep) ? 'block' : 'none';
    });

    
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressBar').style.width = progressPercent + "%";
    document.getElementById('stepIndicator').innerText = `Step ${currentStep} of ${totalSteps}`;

    
    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'inline-block';
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.innerText = currentStep === totalSteps ? 'Submit' : 'Next';

    if (currentStep === 4) renderSummary();
}

function validateCurrentStep() {
    const errorSpan = document.getElementById(`error${currentStep}`);
    errorSpan.innerText = "";

    if (currentStep === 1) {
        const fName = document.getElementById('firstName').value;
        const lName = document.getElementById('lastName').value;
        if (fName.length < 2 || lName.length < 2) {
            errorSpan.innerText = "Names must be at least 2 characters.";
            return false;
        }
        formData.name = `${fName} ${lName}`;
    }

    if (currentStep === 2) {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        if (!email.includes('@') || pass.length < 6) {
            errorSpan.innerText = "Enter a valid email and 6+ char password.";
            return false;
        }
        formData.email = email;
    }

    if (currentStep === 3) {
        const theme = document.getElementById('theme').value;
        if (!theme) {
            errorSpan.innerText = "Please select a theme.";
            return false;
        }
        formData.theme = theme;
        formData.newsletter = document.getElementById('newsletter').checked;
    }

    return true;
}

function renderSummary() {
    const summary = document.getElementById('reviewSummary');
    summary.innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Theme:</strong> ${formData.theme}</p>
        <p><strong>Newsletter:</strong> ${formData.newsletter ? 'Yes' : 'No'}</p>
    `;
}

function changeStep(n) {
    if (n === 1 && !validateCurrentStep()) return;

    currentStep += n;

    if (currentStep > totalSteps) {
        alert("Form Submitted! Data: " + JSON.stringify(formData));
        location.reload(); 
    } else {
        updateUI();
    }
}