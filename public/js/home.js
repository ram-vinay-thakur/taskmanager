document.addEventListener('DOMContentLoaded', async function () {
    const getUser = async () => {
        try {
            const response = await fetch('/get-user?json=true');
            console.log('Response Status:', response.status);

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            console.log('User Data:', data); // Log the data to see what it contains
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call the function
    await getUser();
    // Get the modal element
    const modal = document.querySelector('.modal');

    // Get the button that opens the modal
    const addTaskBtn = document.querySelector('.task-main-create');

    // Get the <span> element that closes the modal
    const closeBtn = document.querySelector('.close-btn');

    // When the user clicks the button, open the modal
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // When the user clicks on <span> (x), close the modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

});
