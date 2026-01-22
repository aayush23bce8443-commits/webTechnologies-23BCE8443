const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const passwordInput = document.getElementById('password');


const validationRules = {
    Student: { minAge: 16, pwLength: 6, requireSkills: false },
    Teacher: { minAge: 21, pwLength: 8, requireSkills: true },
    Admin:   { minAge: 25, pwLength: 12, requireSkills: false }
};


roleSelect.addEventListener('change', () => {
    const role = roleSelect.value;
    const skillsField = document.getElementById('skillsContainer');
    
    
    skillsField.style.display = validationRules[role].requireSkills ? 'block' : 'none';
    
    
    validatePassword();
});


function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && (email.endsWith('.edu') || email.endsWith('.com'));
}


function validatePassword() {
    const role = roleSelect.value;
    const pass = passwordInput.value;
    const minLen = validationRules[role].pwLength;
    const errorSpan = document.getElementById('passwordError');
    
    if (pass.length < minLen) {
        showError(passwordInput, errorSpan, `${role} requires at least ${minLen} characters.`);
        return false;
    } else {
        clearError(passwordInput, errorSpan);
        return true;
    }
}


function showError(input, span, message) {
    input.classList.add('invalid');
    span.textContent = message;
}

function clearError(input, span) {
    input.classList.remove('invalid');
    span.textContent = '';
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const role = roleSelect.value;

    
    const age = document.getElementById('age').value;
    if (age < validationRules[role].minAge) {
        showError(document.getElementById('age'), document.getElementById('ageError'), 
        `Minimum age for ${role} is ${validationRules[role].minAge}`);
        isValid = false;
    }

    
    if (!validatePassword()) isValid = false;

    
    if (passwordInput.value !== document.getElementById('confirmPassword').value) {
        showError(document.getElementById('confirmPassword'), document.getElementById('confirmError'), "Passwords do not match");
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful for " + role + "!");
        form.reset();
    }
});