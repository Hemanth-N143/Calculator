const display = document.getElementById("display");

function appendToDisplay(input) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent entering multiple consecutive operators or starting with an operator
    if (['+', '-', '*', '/'].includes(input) && ['+', '-', '*', '/'].includes(lastChar)) {
        return; // Ignore input if last character is an operator
    }
    
    if (display.value === "" && ['+', '-', '*', '/'].includes(input)) {
        return; // Prevent starting with an operator
    }

    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function Calculate() {
    try {
        const expression = display.value;
        // Check for invalid characters
        if (/[^0-9+\-*/(). ]/.test(expression)) {
            throw new Error("Invalid character");
        }
        
        // Perform the calculation safely
        let result = Function('return ' + expression.replace(/[^0-9+\-*/(). ]/g, ''))();
        
        // Check if the result is a valid number
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error("Invalid calculation");
        }

        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}
