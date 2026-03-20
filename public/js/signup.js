document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch(`${API_BASE_URL}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ username, email, password })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    if (response.ok) {
                        window.location.href = `message.html?status=success&msg=${encodeURIComponent('Successfully Registered')}`;
                    } else {
                        window.location.href = `message.html?status=error&msg=${encodeURIComponent('Already registered')}`;
                    }
                }
            } catch (error) {
                console.error('Signup error:', error);
                window.location.href = `message.html?status=error&msg=${encodeURIComponent('Server Error')}`;
            }
        });
    }
});
