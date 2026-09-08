// layout.js - Plantilla base con menú lateral
const Layout = {
    // Menú lateral (se renderiza en todas las páginas)
    sidebar: (activePage = '') => {
        const menuItems = [
            { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard', url: 'dashboard.html' },
            { id: 'grupos', icon: 'fa-users', label: 'Grupos', url: 'grupos.html' },
            { id: 'alumnos', icon: 'fa-user-graduate', label: 'Alumnos', url: 'alumnos.html' },
            { id: 'gastos', icon: 'fa-credit-card', label: 'Gastos', url: 'gastos.html' },
            { id: 'reportes', icon: 'fa-file-alt', label: 'Reportes', url: 'reportes.html' },
        ];

        const systemItems = [
            { id: 'configuracion', icon: 'fa-cog', label: 'Configuración', url: 'configuracion.html' },
            { id: 'acerca', icon: 'fa-info-circle', label: 'Acerca de', url: 'acerca.html' },
        ];

        let menuHtml = menuItems.map(item => `
            <button class="menu-item ${activePage === item.id ? 'active' : ''}" onclick="location.href='${item.url}'">
                <i class="fas ${item.icon}"></i>
                ${item.label}
            </button>
        `).join('');

        let systemHtml = systemItems.map(item => `
            <button class="menu-item ${activePage === item.id ? 'active' : ''}" onclick="location.href='${item.url}'">
                <i class="fas ${item.icon}"></i>
                ${item.label}
            </button>
        `).join('');

        return `
        <nav class="sidebar" id="sidebar">
            <div class="logo-area">
                <div class="logo-icon">A</div>
                <div>
                    <h1>Administra <span class="version">v2.0</span></h1>
                </div>
            </div>

            <div class="menu">
                <div class="menu-label">Menú principal</div>
                ${menuHtml}

                <div class="divider"></div>

                <div class="menu-label">Sistema</div>
                ${systemHtml}
            </div>

            <div class="user-area">
                <div class="user-info">
                    <div class="avatar">A</div>
                    <div>
                        <div class="user-name">Administrador</div>
                        <div class="user-email">admin@escuela.com</div>
                    </div>
                </div>
                <button class="btn-logout-sidebar" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    Cerrar sesión
                </button>
            </div>
        </nav>
        `;
    },

    // Overlay para móvil
    overlay: () => `
        <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
    `,

    // Header del contenido (solo título)
    header: (title = 'Dashboard', subtitle = '') => `
        <div class="dashboard-header">
            <div class="titulo">
                <h2>
                    <button class="hamburger" onclick="toggleSidebar()">
                        <i class="fas fa-bars"></i>
                    </button>
                    ${title}
                </h2>
                ${subtitle ? `<p>${subtitle}</p>` : ''}
            </div>
            <div class="header-right">
                <div class="connection">
                    <span class="dot green"></span>
                    <span>En línea</span>
                </div>
            </div>
        </div>
    `,

    // Contenido principal
    main: (content) => `
        <div class="main-content">
            <div class="container">
                ${content}
            </div>
        </div>
    `,

    // Render completo
    render: (activePage, title, subtitle, content) => `
        ${Layout.overlay()}
        ${Layout.sidebar(activePage)}
        ${Layout.main(`
            ${Layout.header(title, subtitle)}
            ${content}
        `)}
    `
};

// ============================================
// FUNCIONES GLOBALES
// ============================================

// Toggle sidebar (mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    }
}

// Cerrar sidebar al hacer clic fuera (mobile)
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (window.innerWidth <= 768 && sidebar && overlay) {
            if (!sidebar.contains(e.target) && e.target !== overlay && !e.target.closest('.hamburger')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        }
    });

    // Cerrar al redimensionar a escritorio
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (window.innerWidth > 768 && sidebar && overlay) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
});

// Logout
function logout() {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('user_session');
        window.location.href = 'login.html';
    }
}

window.Layout = Layout;
window.toggleSidebar = toggleSidebar;
window.logout = logout;

console.log('[Layout] Cargado con menú lateral');