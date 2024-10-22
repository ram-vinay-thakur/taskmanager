document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('#modal');
    const addTaskBtn = document.querySelector('.task-main-create');
    const closeBtn = document.querySelector('.close-task-cont');
    // Open the modal when the "Add Task" button is clicked
    addTaskBtn.addEventListener('click', () => {
        console.log('hello')
        modal.classList.remove('hid'); // Show the modal
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hid'); // Hide the modal
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden'); // Hide the modal
        }
    });

    // Handle form submission (optional)
    const taskForm = document.getElementById('add-task-form'); // Assuming you wrap the input fields in a form
    taskForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way

        const title = document.getElementById('task-title').value;
        const estimatedTime = document.getElementById('estimatedTime').value;
        const content = document.getElementById('content').value;

        // Send the task data to your server (implement this part according to your setup)
        try {
            const response = await fetch('/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, estimatedTime, content }),
            });

            if (response.ok) {
                // Handle successful response
                alert('Task added successfully!');
                modal.classList.add('hidden'); // Hide the modal
                taskForm.reset(); // Clear the form
            } else {
                alert('Failed to add task. Please try again.');
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });
});
