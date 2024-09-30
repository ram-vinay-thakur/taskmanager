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
});
