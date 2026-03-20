document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const msg = urlParams.get('msg');
    const msgText = document.getElementById('msg-text');
    const statusIcon = document.getElementById('status-icon');

    if (msg) {
        msgText.innerText = decodeURIComponent(msg);
    }

    if (status === 'success') {
        msgText.classList.add('success');
        statusIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #23d5ab;"></i>';
    } else if (status === 'error') {
        msgText.classList.add('error');
        statusIcon.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #ff4d4d;"></i>';
    } else {
        statusIcon.innerHTML = '<i class="fas fa-info-circle" style="color: #23a6d5;"></i>';
    }
});
