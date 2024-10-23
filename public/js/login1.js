document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission
    console.log('hello')
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const tokenInput = document.getElementById('servertoken');
    const token = tokenInput.value
    // Prepare the data to be sent
    const formData = { email, password, token };

    try {
        // Send the POST request using Fetch API
        const response = await fetch("/user/register/credentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // If response is successful, redirect to the second step
            window.location.href = "/user/register/userInfo";
        } else {
            // Display error message if the registration failed
            const errorData = await response.json();
            alert(`${errorData.statuscode} ${errorData.message}`)
        }
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById("error-message").textContent = "An unexpected error occurred.";
    }
});