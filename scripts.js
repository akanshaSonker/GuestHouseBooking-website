document.addEventListener('DOMContentLoaded', function() {
    // Handle scroll animation for features section
    const features = document.querySelectorAll('.feature');
    const screenPosition = window.innerHeight / 1.2;

    function checkScroll() {
        features.forEach(feature => {
            const featurePosition = feature.getBoundingClientRect().top;

            if (featurePosition < screenPosition) {
                feature.classList.add('visible');
            } else {
                feature.classList.remove('visible'); // Optional: Remove class if not in view
            }
        });
    }

    document.addEventListener('scroll', checkScroll);

    // Toggle mobile navigation menu
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }

    // Handle login form submission
    const loginForm = document.querySelector('#loginSection form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const cpf = loginForm.querySelector('input[name="cpf"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;

            if (cpf && password) {
                alert('Login successful');
                // Add actual login logic here
            } else {
                alert('Please enter your CPF and password');
            }
        });
    }

    // Handle feedback form submission
    const feedbackForm = document.querySelector('.feedback-form form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const feedbackType = feedbackForm.querySelector('select[name="feedbackType"]').value;
            const feedbackMessage = feedbackForm.querySelector('textarea[name="feedbackMessage"]').value;

            if (feedbackType && feedbackMessage) {
                alert('Feedback submitted successfully');
                // Add actual feedback submission logic here
            } else {
                alert('Please fill out all fields');
            }
        });
    }
});
