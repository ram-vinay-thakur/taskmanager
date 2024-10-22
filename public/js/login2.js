
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log('hii')
    const formData = new FormData(this); // Create a FormData object from the form

    fetch('/user/register/userInfo', {
        method: 'POST',
        body: formData // Send the FormData object
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming the server responds with JSON
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            window.location.href = '/'
            console.log('Success:', data); // Handle success
        })
        .catch((error) => {
            console.error('Error:', error); // Handle error
        });
});
