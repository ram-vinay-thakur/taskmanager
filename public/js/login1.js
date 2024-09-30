document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare the data to be sent
    const formData = { email, password };

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
            document.getElementById("error-message").textContent = errorData.message || "Error occurred. Please try again.";
        }
    } catch (error) {
        console.error("Error during registration:", error);
        document.getElementById("error-message").textContent = "An unexpected error occurred.";
    }
});