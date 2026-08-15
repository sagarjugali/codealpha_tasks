const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

// Button Click Events
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent);
    });
});

// Function to handle input
function handleInput(value) {
    if (value === "C") {
        expression = "";
        display.value = "";
    }
    else if (value === "=") {
        try {
            expression = eval(expression).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    }
    else {
        expression += value;
        display.value = expression;
    }
}

// Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        expression += key;
        display.value = expression;
    }
    else if (key === "Enter") {
        event.preventDefault();
        try {
            expression = eval(expression).toString();
            display.value = expression;
        } catch {
            display.value = "Error";
            expression = "";
        }
    }
    else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }
    else if (key === "Escape") {
        expression = "";
        display.value = "";
    }
});