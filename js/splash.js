// splash.js - Controlador de la pantalla de bienvenida
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en splash, esperamos 2.5s y redirigimos
    if (window.location.pathname.includes('splash.html')) {
        setTimeout(() => {
            window.location.href = 'index.html?view=login';
        }, 2500);
    }
});