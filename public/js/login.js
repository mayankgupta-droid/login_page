document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const forgotBtn = document.getElementById('forgotBtn');
    const forgotFormDiv = document.getElementById('forgot-form');
    const forgotForm = document.getElementById('forgotForm');

    if (forgotBtn) {
        forgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            forgotFormDiv.style.display = forgotFormDiv.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Using x-www-form-urlencoded as existing backend is set for it
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email, password })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    // Fallback if no redirect but success
                    const text = await response.text();
                    if (response.ok) {
                        window.location.href = `message.html?status=success&msg=${encodeURIComponent('Login Successful')}`;
                    } else {
                        window.location.href = `message.html?status=error&msg=${encodeURIComponent('Invalid email or password')}`;
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                window.location.href = `message.html?status=error&msg=${encodeURIComponent('Server Error')}`;
            }
        });
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;

            try {
                const response = await fetch(`${API_BASE_URL}/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ email })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    window.location.href = `message.html?status=error&msg=${encodeURIComponent('Email not found')}`;
                }
            } catch (error) {
                window.location.href = `message.html?status=error&msg=${encodeURIComponent('Server Error')}`;
            }
        });
    }
});
