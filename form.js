// Add event listener for form submission
document.getElementById('RegForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    validateForm(); // Call the validation function
});

// Add event listeners to form fields for real-time validation on input change
document.querySelectorAll('input, select').forEach(function(element) {
    element.addEventListener('change', function() {
        validateField(element); // Validate the field when its value changes
    });
});

// Main form validation function
function validateForm() {
    let isValid = true; // Track whether the form is valid or not

    // Loop over all input fields and validate each one
    document.querySelectorAll('input, select').forEach(function(element) {
        if (!validateField(element)) {
            isValid = false; // If any field is invalid, mark the form as invalid
        }
    });

    // If the form is valid, show success message and reset the form
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById('RegForm').reset(); // Reset the form after successful validation
    } else {
        alert("Please correct the errors in the form."); // If invalid, show an error alert
    }
}

// Function to validate individual fields
function validateField(element) {
    let isValid = true;
    const errorElement = document.getElementById(element.id + '-error'); // Get corresponding error element

    // Check if the field is empty
    if (element.value.trim() === "") {
        errorElement.style.display = 'block'; // Show error message
        element.classList.add('is-invalid'); // Add invalid class to input
        isValid = false;
    } else {
        element.classList.remove('is-invalid'); // Remove invalid class
        errorElement.style.display = 'none'; // Hide error message
    }

    // Specific validation for email format
    if (element.id === "email" && element.value !== "") {
        if (!validateEmail(element.value)) {
            errorElement.textContent = "Please enter a valid email."; // Update email error message
            errorElement.style.display = 'block'; // Show error message
            element.classList.add('is-invalid'); // Mark email as invalid
            isValid = false;
        } else {
            element.classList.remove('is-invalid'); // If valid, remove invalid class
            errorElement.textContent = "Email is required."; // Reset error message
        }
    }

    // Specific validation for password length
    if (element.id === "password" && element.value.length < 6) {
        errorElement.textContent = "Password must be at least 6 characters long."; // Update password error
        errorElement.style.display = 'block'; // Show error message
        element.classList.add('is-invalid'); // Mark password as invalid
        isValid = false;
    }

    return isValid; // Return true if valid, false otherwise
}

// Function to validate email format using regex
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // Return true if email matches pattern, false otherwise
}
