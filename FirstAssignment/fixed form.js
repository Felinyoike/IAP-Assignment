document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("myform");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='number']");
        let isValid = true;

        inputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity()) {
                isValid = false;
            }
        });

        if (isValid) {
            alert("Form submitted successfully!");
        }
    });

    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function () {
            validateInput(input);
        });
    });

    function validateInput(input) {
        let errorMessage = input.nextElementSibling;

        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("span");
            errorMessage.classList.add("error-message");
            errorMessage.style.color = "red";
            input.parentNode.appendChild(errorMessage);
        }

        if (!input.checkValidity()) {
            input.classList.add("invalid");
            errorMessage.textContent = "Invalid input!";
            errorMessage.style.display = "block";
        } else {
            input.classList.remove("invalid");
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
        }
    }
});
