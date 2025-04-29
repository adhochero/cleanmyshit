const steps = [
    {
        type: "input",
        question: "Where is this dirty ass house?",
        placeholder: "Enter home address"
    },
    {
        type: "select",
        question: "How many rooms:",
        options: ["1", "2", "3", "4"]
    },
    {
        type: "input",
        question: "What's your email address?",
        placeholder: "Enter your email"
    },
    {
        type: "select",
        question: "Are you ready for this?",
        options: ["Yes", "No"]
    }
];

let currentStep = 0;
const userAnswers = [];

const stepContent = document.getElementById('stepContent');
const backButton = document.getElementById('backButton');
const nextButton = document.getElementById('nextButton');

function renderStep() {
    const step = steps[currentStep];
    stepContent.innerHTML = `<h2>${step.question}</h2>`;

    if (step.type === "input") {
        stepContent.innerHTML += `<input type="text" id="answerInput" placeholder="${step.placeholder}" value="${userAnswers[currentStep] || ''}">`;
    } else if (step.type === "select") {
        let selectHTML = `<select id="answerInput"><option value="">Select an option</option>`;
        step.options.forEach(option => {
            const selected = userAnswers[currentStep] === option ? 'selected' : '';
            selectHTML += `<option value="${option}" ${selected}>${option}</option>`;
        });
        selectHTML += `</select>`;
        stepContent.innerHTML += selectHTML;
    }

    backButton.disabled = currentStep === 0;
    nextButton.innerText = currentStep === steps.length - 1 ? "Finish" : "Next";

    // Disable next initially
    nextButton.disabled = true;

    // Listen for input changes
    const input = document.getElementById('answerInput');
    input.addEventListener('input', checkInput);
    input.addEventListener('change', checkInput); // for selects
}

function checkInput() {
    const input = document.getElementById('answerInput');
    if (input.value.trim() !== "") {
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
}

function saveAnswer() {
    const input = document.getElementById('answerInput');
    userAnswers[currentStep] = input.value.trim();
}

nextButton.addEventListener('click', () => {
    saveAnswer();

    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        // Finish flow
        document.getElementById("stepContainer").style.display = "none";
        document.getElementById("calendarContainer").style.display = "block";
    }
});

backButton.addEventListener('click', () => {
    saveAnswer();
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// Initialize the first step
renderStep();
