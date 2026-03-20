document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const emailField = document.getElementById('email-field');

    // Get email from URL and put it in the hidden field
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        emailField.value = email;
    } else {
        // Redirect back if no email
        window.location.href = 'index.html';
    }

    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const new_password = document.getElementById('new_password').value;
            const emailValue = emailField.value;

            try {
                const response = await fetch(`${API_BASE_URL}/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email: emailValue, new_password: new_password })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    if (response.ok) {
                        window.location.href = `message.html?status=success&msg=${encodeURIComponent('Password updated successfully')}`;
                    } else {
                        window.location.href = `message.html?status=error&msg=${encodeURIComponent('Reset Failed')}`;
                    }
                }
            } catch (error) {
                console.error('Reset error:', error);
                window.location.href = `message.html?status=error&msg=${encodeURIComponent('Server Error')}`;
            }
        });
    }
});
