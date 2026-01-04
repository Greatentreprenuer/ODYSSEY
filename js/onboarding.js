document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    let currentStep = 0;

    // Data Store
    const userData = {
        name: '',
        intent: [],
        values: [],
        bio: ''
    };

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === stepIndex) {
                step.classList.add('active');
            }
        });
    }

    function validateStep(stepIndex) {
        if (stepIndex === 0) {
            const nameInput = document.getElementById('userName');
            if (!nameInput.value.trim()) {
                alert("Please enter your name.");
                return false;
            }
            userData.name = nameInput.value.trim();
            // capture intent
            const selectedIntents = document.querySelectorAll('#step1 .options-grid .selectable.selected');
            if (selectedIntents.length === 0) {
                // Optional: enforce selection? Let's say yes for "Intent"
                // alert("Please select an intent.");
                // return false; 
            }
            userData.intent = Array.from(selectedIntents).map(el => el.innerText);
        }
        if (stepIndex === 1) {
            const selectedValues = document.querySelectorAll('#step2 .options-grid .selectable.selected');
            userData.values = Array.from(selectedValues).map(el => el.innerText);
        }
        if (stepIndex === 2) {
            const bio = document.querySelector('textarea').value;
            userData.bio = bio;
        }
        return true;
    }

    nextBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (!validateStep(currentStep)) return;

            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            } else {
                // Final Step: Save and Redirect
                localStorage.setItem('odysseyUser', JSON.stringify(userData));
                window.location.href = 'app.html';
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Selection logic
    // We need to attach listeners to specific steps to know which data bucket to fill, 
    // but the validation step handles extraction, so generic toggle is fine.
    const selectables = document.querySelectorAll('.selectable');
    selectables.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    // Add IDs to steps for easier scoping
    steps[0].id = 'step1';
    steps[1].id = 'step2';
    steps[2].id = 'step3';
});
