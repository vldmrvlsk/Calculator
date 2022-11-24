const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const text = screen.innerText;
        const operations = ['+','-','*','/'];

        if (parseFloat(e.target.value) || e.target.value == "0") {
            if (screen.getAttribute("data-isResult") == "1") {
                screen.innerText = e.target.value;
                screen.setAttribute("data-isResult", "0");
            } else {
                screen.innerText += e.target.value;
            }
        }

        if (e.target.value == "." && !text.includes(".")) {
            if (screen.getAttribute("data-isResult") == "1") {
                screen.innerText = e.target.value;
                screen.setAttribute("data-isResult", "0");
            } else {
                screen.innerText += e.target.value;
            }
        }

        if (e.target.value == "CE") {
            screen.innerText = "";
            screen.setAttribute("data-prev-number", "");
            screen.setAttribute("data-op", "");
        }

        if (e.target.value == "backspace") {
            screen.innerText = text.slice(0, text.length -1);
        }

        if (operations.includes(e.target.value) && text) {
            screen.setAttribute("data-prev-number", text);
            screen.setAttribute("data-op", e.target.value);
            screen.innerText = "";
        }

        if (e.target.value == "=") {
            const prevNumber = screen.getAttribute("data-prev-number");
            const operation = screen.getAttribute("data-op");

            if (operation && prevNumber && text) {
                const num1 = parseFloat(prevNumber);
                const num2 = parseFloat(text);

                switch(operation) {
                    case "+":
                        screen.innerText = num1 + num2;
                        break;
                    case "-":
                        screen.innerText = num1 - num2;
                        break;
                    case "*":
                        screen.innerText = num1 * num2;
                        break;
                    case "/": 
                        screen.innerText = num1 / num2;
                        break;
                }

                screen.setAttribute("data-prev-number", "");
                screen.setAttribute("data-op", "");
                screen.setAttribute("data-isResult", "1");
            }
        }
    })
})