// app.js - Versión de prueba sin Supabase
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view') || 'login';

    // Renderizar según la vista
    switch(view) {
        case 'login':
            renderLogin();
            break;
        case 'dashboard':
            renderDashboard();
            break;
        case 'groups':
            renderGroups();
            break;
        case 'students':
            renderStudents();
            break;
        case 'expenses':
            renderExpenses();
            break;
        case 'reports':
            renderReports();
            break;
        case 'settings':
            renderSettings();
            break;
        case 'about':
            renderAbout();
            break;
        default:
            renderNotFound();
    }

    // Inicializar indicador de conexión
    updateConnectionStatus();
});

// ============================================
// INDICADOR DE CONEXIÓN
// ============================================

function updateConnectionStatus() {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    
    if (!dot || !text) return;
    
    dot.className = 'dot green';
    text.textContent = 'Conectado';
}

// ============================================
// RENDERIZADORES
// ============================================

function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Iniciar Sesión', `
        <div class="clay" style="max-width:380px;margin:40px auto 0;">
            <h2 style="font-size:22px;font-weight:700;color:#1e1b4b;text-align:center;margin-bottom:20px;">Bienvenido de vuelta</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" id="email" class="input" placeholder="admin@escuela.com" value="admin@escuela.com" required />
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="password" class="input" placeholder="••••••••" value="Admin123456" required />
                </div>
                <button type="submit" class="btn btn-primary btn-block" style="margin-top:8px;">Ingresar</button>
            </form>
            <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;">v1.0.0 - Administra</p>
            <p style="text-align:center;font-size:11px;color:#d1d5db;margin-top:4px;">Usuario: admin@escuela.com / Contraseña: Admin123456</p>
        </div>
    `);
    
    // Listener del formulario
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;
            
            if (email === 'admin@escuela.com' && password === 'Admin123456') {
                // Guardar sesión
                localStorage.setItem('user_session', JSON.stringify({
                    email: email,
                    timestamp: new Date().toISOString()
                }));
                window.location.href = 'index.html?view=dashboard';
            } else {
                alert('❌ Usuario o contraseña incorrectos');
            }
        });
    }
}

function renderDashboard() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Dashboard', `
        <div class="stats">
            <div class="clay clay-sm stat purple">
                <div class="num">6</div>
                <div class="label">Grupos</div>
            </div>
            <div class="clay clay-sm stat pink">
                <div class="num">$9,000</div>
                <div class="label">Colegiaturas</div>
            </div>
            <div class="clay clay-sm stat blue">
                <div class="num">120</div>
                <div class="label">Alumnos</div>
            </div>
            <div class="clay clay-sm stat red">
                <div class="num">$2,300</div>
                <div class="label">Gastado</div>
            </div>
        </div>
        
        <div class="clay balance-box">
            <div class="num">$6,700</div>
            <div class="label">Balance total</div>
        </div>
        
        <div class="nav">
            <button onclick="navigateTo('groups')" class="btn">📚 Grupos</button>
            <button onclick="navigateTo('expenses')" class="btn">💰 Gastos</button>
            <button onclick="navigateTo('reports')" class="btn">📊 Reportes</button>
            <button onclick="navigateTo('settings')" class="btn">⚙️ Configuración</button>
            <button onclick="navigateTo('about')" class="btn">ℹ️ Acerca de</button>
        </div>
        
        <div style="text-align:center;margin-top:16px;">
            <button onclick="simulateOffline()" class="btn btn-sm" style="background:#fef3c7;color:#92400e;">🧪 Simular operación offline</button>
        </div>
    `);
}

function renderGroups() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Grupos', `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h2 style="font-size:18px;color:#1e1b4b;">Gestión de Grupos</h2>
            <button onclick="showCreateGroup()" class="btn btn-primary btn-sm">+ Nuevo</button>
        </div>
        
        <div style="margin-bottom:12px;">
            <input type="text" id="searchGroup" class="input" placeholder="🔍 Buscar grupo..." style="font-size:13px;" />
        </div>
        
        <div id="groupsList" class="group-list">
            <div class="clay clay-sm group-item">
                <div class="info">
                    <h3>Grupo 1A</h3>
                    <p>Prof. Martínez • 20 alumnos</p>
                </div>
                <div class="actions">
                    <button onclick="navigateTo('students','group=1')" class="btn btn-sm" style="font-size:10px;">Ver</button>
                    <button onclick="alert('Editar grupo')" class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button onclick="alert('Eliminar grupo')" class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
            <div class="clay clay-sm group-item">
                <div class="info">
                    <h3>Grupo 1B</h3>
                    <p>Prof. García • 18 alumnos</p>
                </div>
                <div class="actions">
                    <button onclick="navigateTo('students','group=2')" class="btn btn-sm" style="font-size:10px;">Ver</button>
                    <button onclick="alert('Editar grupo')" class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button onclick="alert('Eliminar grupo')" class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
            <div class="clay clay-sm group-item">
                <div class="info">
                    <h3>Grupo 2A</h3>
                    <p>Prof. López • 22 alumnos</p>
                </div>
                <div class="actions">
                    <button onclick="navigateTo('students','group=3')" class="btn btn-sm" style="font-size:10px;">Ver</button>
                    <button onclick="alert('Editar grupo')" class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button onclick="alert('Eliminar grupo')" class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('dashboard')" class="btn btn-sm" style="font-size:11px;">← Volver al dashboard</button>
        </div>
    `);
}

function renderStudents() {
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('group') || '1';
    
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Alumnos - Grupo ' + groupId, `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h2 style="font-size:18px;color:#1e1b4b;">Alumnos del Grupo</h2>
            <button onclick="alert('Crear alumno')" class="btn btn-primary btn-sm">+ Nuevo</button>
        </div>
        
        <div class="stats" style="margin-bottom:12px;">
            <div class="clay clay-sm stat blue" style="padding:10px;">
                <div class="num" style="font-size:20px;">20</div>
                <div class="label">Total Alumnos</div>
            </div>
            <div class="clay clay-sm stat green" style="padding:10px;">
                <div class="num" style="font-size:20px;">$30,000</div>
                <div class="label">Colegiaturas</div>
            </div>
        </div>
        
        <div style="margin-bottom:12px;">
            <input type="text" class="input" placeholder="🔍 Buscar por nombre..." style="font-size:13px;" />
        </div>
        
        <div id="studentsList" style="display:flex;flex-direction:column;gap:8px;">
            <div class="clay clay-sm" style="display:flex;justify-content:space-between;align-items:center;border:2px solid #6ee7b7;">
                <div>
                    <div style="font-weight:600;color:#1e1b4b;font-size:14px;">1. García Pérez, Ana</div>
                    <div style="font-size:12px;color:#065f46;">✅ Pagado - $1,500</div>
                    <div style="font-size:11px;color:#6b7280;">📞 555-1234</div>
                </div>
                <div style="display:flex;gap:4px;">
                    <button class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
            
            <div class="clay clay-sm" style="display:flex;justify-content:space-between;align-items:center;border:2px solid #fca5a5;">
                <div>
                    <div style="font-weight:600;color:#1e1b4b;font-size:14px;">2. López Méndez, Carlos</div>
                    <div style="font-size:12px;color:#991b1b;">⚠️ Adeuda $500</div>
                    <div style="font-size:11px;color:#6b7280;">📞 555-5678</div>
                </div>
                <div style="display:flex;gap:4px;">
                    <button class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
            
            <div class="clay clay-sm" style="display:flex;justify-content:space-between;align-items:center;border:2px solid #fcd34d;">
                <div>
                    <div style="font-weight:600;color:#1e1b4b;font-size:14px;">3. Ramírez Torres, Sofía</div>
                    <div style="font-size:12px;color:#92400e;">🔄 Abonos: $800 de $1,500</div>
                    <div style="font-size:11px;color:#6b7280;">📞 555-9012</div>
                </div>
                <div style="display:flex;gap:4px;">
                    <button class="btn btn-sm" style="font-size:10px;">✏️</button>
                    <button class="btn btn-sm btn-danger" style="font-size:10px;">🗑️</button>
                </div>
            </div>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('groups')" class="btn btn-sm" style="font-size:11px;">← Volver a grupos</button>
        </div>
    `);
}

function renderExpenses() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Gastos', `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <h2 style="font-size:18px;color:#1e1b4b;">Registro de Gastos</h2>
            <button onclick="alert('Crear gasto')" class="btn btn-primary btn-sm">+ Nuevo</button>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:12px;">
            <input type="text" class="input" placeholder="🔍 Buscar gasto..." style="font-size:13px;" />
        </div>
        
        <div id="expensesList" style="display:flex;flex-direction:column;gap:8px;">
            <div class="clay clay-sm" style="display:flex;justify-content:space-between;">
                <div>
                    <div style="font-weight:600;color:#1e1b4b;">Material didáctico</div>
                    <div style="font-size:12px;color:#6b7280;">Grupo 1A • Mantenimiento</div>
                    <div style="font-size:11px;color:#6b7280;">📅 2026-01-20</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:700;color:#dc2626;">-$500.00</div>
                    <div style="font-size:11px;color:#6b7280;">$25 c/u</div>
                </div>
            </div>
            
            <div class="clay clay-sm" style="display:flex;justify-content:space-between;">
                <div>
                    <div style="font-weight:600;color:#1e1b4b;">Evento fin de curso</div>
                    <div style="font-size:12px;color:#6b7280;">Grupo 1B • Evento</div>
                    <div style="font-size:11px;color:#6b7280;">📅 2026-02-15</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:700;color:#dc2626;">-$360.00</div>
                    <div style="font-size:11px;color:#6b7280;">$20 c/u</div>
                </div>
            </div>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('dashboard')" class="btn btn-sm" style="font-size:11px;">← Volver al dashboard</button>
        </div>
    `);
}

function renderReports() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Reportes', `
        <h2 style="font-size:18px;color:#1e1b4b;margin-bottom:14px;">Generar Reportes</h2>
        
        <div class="clay">
            <div class="form-group">
                <label>Grupo</label>
                <select class="input">
                    <option value="">Todos los grupos</option>
                    <option value="1">Grupo 1A</option>
                    <option value="2">Grupo 1B</option>
                </select>
            </div>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div class="form-group">
                    <label>Fecha inicio</label>
                    <input type="date" class="input" />
                </div>
                <div class="form-group">
                    <label>Fecha fin</label>
                    <input type="date" class="input" />
                </div>
            </div>
            
            <div style="margin:12px 0;">
                <label style="font-size:13px;color:#4a4a6a;display:block;margin-bottom:6px;">Opciones de impresión</label>
                <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:13px;color:#4a4a6a;">
                    <label><input type="checkbox" checked /> Total recaudado</label>
                    <label><input type="checkbox" checked /> Total gastado</label>
                    <label><input type="checkbox" checked /> Dinero restante</label>
                </div>
            </div>
            
            <button onclick="alert('Generando reporte...')" class="btn btn-primary btn-block">📊 Generar Reporte PDF</button>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('dashboard')" class="btn btn-sm" style="font-size:11px;">← Volver al dashboard</button>
        </div>
    `);
}

function renderSettings() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Configuración', `
        <h2 style="font-size:18px;color:#1e1b4b;margin-bottom:14px;">Configuración</h2>
        
        <div style="display:flex;flex-direction:column;gap:12px;">
            <div class="clay">
                <h3 style="font-size:15px;color:#1e1b4b;margin-bottom:6px;">📤 Exportar Base de Datos</h3>
                <p style="font-size:12px;color:#6b7280;margin-bottom:8px;">Exporta todos los datos en formato JSON</p>
                <button onclick="alert('Exportando datos...')" class="btn btn-sm">Exportar</button>
            </div>
            
            <div class="clay">
                <h3 style="font-size:15px;color:#1e1b4b;margin-bottom:6px;">📥 Importar Base de Datos</h3>
                <p style="font-size:12px;color:#6b7280;margin-bottom:8px;">Importa datos desde un archivo JSON</p>
                <input type="file" accept=".json" style="font-size:12px;margin-bottom:8px;" />
                <button onclick="alert('Importando datos...')" class="btn btn-sm">Importar</button>
            </div>
            
            <div class="clay">
                <h3 style="font-size:15px;color:#1e1b4b;margin-bottom:6px;">🔄 Sincronización</h3>
                <div style="font-size:13px;color:#6b7280;">
                    <p>Estado: <span style="color:#059669;">Sincronizado</span></p>
                    <p>Datos pendientes: 0</p>
                </div>
                <button onclick="alert('Forzando sincronización...')" class="btn btn-sm" style="margin-top:8px;">Forzar sincronización</button>
            </div>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('dashboard')" class="btn btn-sm" style="font-size:11px;">← Volver al dashboard</button>
        </div>
    `);
}

function renderAbout() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('Acerca de', `
        <div class="clay" style="max-width:400px;margin:0 auto;text-align:center;">
            <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);display:flex;align-items:center;justify-content:center;color:white;font-size:26px;font-weight:bold;margin:0 auto 12px;">A</div>
            <h2 style="font-size:22px;color:#1e1b4b;">Administra</h2>
            <p style="color:#6b7280;font-size:13px;margin-bottom:12px;">v1.0.0</p>
            
            <div style="text-align:left;font-size:13px;color:#4a4a6a;line-height:1.6;">
                <p><strong>🎯 Propósito:</strong> Gestión financiera y control escolar</p>
                <p><strong>✨ Beneficios:</strong></p>
                <ul style="padding-left:20px;margin:4px 0;">
                    <li>Control de colegiaturas y pagos</li>
                    <li>Gastos compartidos</li>
                    <li>Reportes en PDF</li>
                    <li>Funciona sin internet</li>
                </ul>
            </div>
            
            <div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.06);">
                <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#f472b6,#ec4899);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:bold;margin:0 auto 6px;">A</div>
                <p style="font-size:11px;color:#9ca3af;">amayasily</p>
            </div>
        </div>
        
        <div style="text-align:center;margin-top:12px;">
            <button onclick="navigateTo('dashboard')" class="btn btn-sm" style="font-size:11px;">← Volver al dashboard</button>
        </div>
    `);
}

function renderNotFound() {
    const app = document.getElementById('app');
    app.innerHTML = Layout.render('404', `
        <div class="clay" style="text-align:center;padding:40px 20px;margin-top:40px;">
            <h2 style="font-size:24px;color:#1e1b4b;">Página no encontrada</h2>
            <p style="color:#6b7280;margin:8px 0 16px;">La vista solicitada no existe.</p>
            <button onclick="navigateTo('dashboard')" class="btn btn-primary">Volver al inicio</button>
        </div>
    `);
}

// ============================================
// NAVEGACIÓN
// ============================================

function navigateTo(view, params = '') {
    const query = params ? `?view=${view}&${params}` : `?view=${view}`;
    window.location.href = `index.html${query}`;
}

window.navigateTo = navigateTo;

// ============================================
// FUNCIONES GLOBALES
// ============================================

function showCreateGroup() {
    alert('Funcionalidad: Crear nuevo grupo');
}

function simulateOffline() {
    alert('🧪 Simulación: Operación offline agregada a la cola');
}

window.showCreateGroup = showCreateGroup;
window.simulateOffline = simulateOffline;

// ============================================
// CIERRE DE SESIÓN
// ============================================

function logout() {
    if (confirm('¿Cerrar sesión?')) {
        localStorage.removeItem('user_session');
        navigateTo('login');
    }
}

window.logout = logout;

console.log('[App] Cargado correctamente - Versión sin Supabase');