// js/temas.js - Sistema de temas dinámicos por meses festivos
const TemasManager = {
    temaActual: 'default',
    
    // Configuración de temas por meses
    temasPorMes: {
        'enero': {
            nombre: 'Año Nuevo 🎊',
            mes: 0, // Enero (0-11)
            colores: {
                '--color-primario': '#1e40af',    // Azul Año Nuevo
                '--color-secundario': '#fbbf24',   // Dorado
                '--color-acento': '#ffffff',       // Blanco
                '--color-fondo': '#f0f9ff',
                '--color-texto': '#1e1b4b',
                '--gradiente-principal': 'linear-gradient(135deg, #1e40af 0%, #fbbf24 50%, #dc2626 100%)'
            },
            banner: {
                mostrar: true,
                texto: '🎊 ¡Feliz Año Nuevo! 🎉',
                subtexto: 'Comenzando con todo este 2026'
            }
        },
        'septiembre': {
            nombre: 'Fiestas Patrias 🇲🇽',
            mes: 8, // Septiembre
            colores: {
                '--color-primario': '#006847',    // Verde México
                '--color-secundario': '#CE1126',   // Rojo México
                '--color-acento': '#FFFFFF',       // Blanco
                '--color-fondo': '#f0f7f4',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #006847 0%, #FFFFFF 50%, #CE1126 100%)'
            },
            banner: {
                mostrar: true,
                texto: '🇲🇽 ¡Viva México! 🇲🇽',
                subtexto: 'Mes Patrio 2026'
            }
        },
        'octubre': {
            nombre: 'Halloween ',
            mes: 9, // Octubre
            colores: {
                '--color-primario': '#FF6B00',    // Naranja
                '--color-secundario': '#6B00FF',   // Morado
                '--color-acento': '#00FF00',       // Verde
                '--color-fondo': '#1a0f0f',
                '--color-texto': '#ffffff',
                '--gradiente-principal': 'linear-gradient(135deg, #FF6B00 0%, #6B00FF 50%, #000000 100%)'
            },
            banner: {
                mostrar: true,
                texto: '🎃 ¡Feliz Halloween! 👻',
                subtexto: 'Temporada de Terror 2026'
            }
        },
        'dia-muertos': {
            nombre: 'Día de Muertos ',
            mes: 10, // Noviembre
            colores: {
                '--color-primario': '#FF6B35',    // Naranja mexicano
                '--color-secundario': '#F7931E',   // Amarillo cempasúchil
                '--color-acento': '#FF1493',       // Rosa mexicano
                '--color-fondo': '#fff5f0',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF1493 100%)'
            },
            banner: {
                mostrar: true,
                texto: '💀 Día de Muertos 🌺',
                subtexto: 'Tradiciones Mexicanas 2026'
            }
        },
        'navidad': {
            nombre: 'Navidad 🎄',
            mes: 11, // Diciembre
            colores: {
                '--color-primario': '#C41E3A',    // Rojo Navidad
                '--color-secundario': '#165B33',   // Verde Navidad
                '--color-acento': '#FFD700',       // Dorado
                '--color-fondo': '#fff5f5',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #C41E3A 0%, #FFD700 50%, #165B33 100%)'
            },
            banner: {
                mostrar: true,
                texto: '🎄 ¡Feliz Navidad! 🎅',
                subtexto: 'Temporada Navideña 2026'
            }
        },
        'default': {
            nombre: 'Tema Clásico',
            mes: -1, // No aplica
            colores: {
                '--color-primario': '#7c3aed',
                '--color-secundario': '#a78bfa',
                '--color-acento': '#ffffff',
                '--color-fondo': '#f5f0ff',
                '--color-texto': '#1e1b4b',
                '--gradiente-principal': 'linear-gradient(135deg, #c084fc, #7c3aed)'
            },
            banner: {
                mostrar: false
            }
        }
    },

    // Inicializar
    init() {
        this.detectarTemaPorMes();
        this.aplicarTema(this.temaActual);
        console.log('[Temas] Sistema inicializado - Tema actual:', this.temaActual);
    },

    // Detectar tema basado en el mes actual
    detectarTemaPorMes() {
        const hoy = new Date();
        const mesActual = hoy.getMonth();

        // Buscar el tema correspondiente al mes
        for (const [temaKey, temaConfig] of Object.entries(this.temasPorMes)) {
            if (temaKey === 'default') continue;
            
            if (mesActual === temaConfig.mes) {
                this.temaActual = temaKey;
                return;
            }
        }

        // Si no hay tema festivo activo, usar default
        this.temaActual = 'default';
    },

    // Aplicar tema
    aplicarTema(temaKey) {
        const tema = this.temasPorMes[temaKey];
        if (!tema) return;

        // Aplicar variables CSS
        const root = document.documentElement;
        for (const [propiedad, valor] of Object.entries(tema.colores)) {
            root.style.setProperty(propiedad, valor);
        }

        // Agregar clase al body
        document.body.classList.remove(...Object.keys(this.temasPorMes).map(t => `tema-${t}`));
        document.body.classList.add(`tema-${temaKey}`);

        // Mostrar/ocultar banner
        this.actualizarBanner(tema.banner);

        // Guardar en localStorage
        localStorage.setItem('tema_activo', temaKey);
    },

    // Actualizar banner festivo
    actualizarBanner(config) {
        let banner = document.getElementById('banner-festivo');
        
        if (!config.mostrar) {
            if (banner) banner.remove();
            return;
        }

        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'banner-festivo';
            banner.className = 'banner-festivo';
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertBefore(banner, mainContent.querySelector('.container'));
            }
            return;
        }

        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-texto">${config.texto}</div>
                <div class="banner-subtexto">${config.subtexto}</div>
            </div>
        `;
    },

    // Cambiar tema manualmente
    cambiarTema(temaKey) {
        if (this.temasPorMes[temaKey]) {
            this.temaActual = temaKey;
            this.aplicarTema(temaKey);
            console.log('[Temas] Tema cambiado a:', temaKey);
        }
    },

    // Obtener lista de temas disponibles
    getTemasDisponibles() {
        return Object.entries(this.temasPorMes).map(([key, config]) => ({
            key,
            nombre: config.nombre,
            activo: key === this.temaActual
        }));
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (typeof TemasManager !== 'undefined') {
        TemasManager.init();
    }
    window.TemasManager = TemasManager;
});

// Exportar para usar en otros módulos
export default TemasManager;