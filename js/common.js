const API_BASE_URL = 'https://login-page-p2c5.onrender.com';

function togglePass(id, icon) {
    const input = document.getElementById(id);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function socialAlert(platform) {
    alert(platform + " login coming soon");
}
