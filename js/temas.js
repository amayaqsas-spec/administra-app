// js/temas.js - Sistema de temas dinámicos por meses festivos
const TemasManager = {
    temaActual: 'default',
    
    // Configuración de temas por meses
    temasPorMes: {
        'enero': {
            nombre: 'Año Nuevo 🎊',
            mes: 0, // Enero (0-11)
            colores: {
                '--color-primario': '#1e40af',
                '--color-secundario': '#fbbf24',
                '--color-acento': '#ffffff',
                '--color-fondo': '#f0f9ff',
                '--color-texto': '#1e1b4b',
                '--gradiente-principal': 'linear-gradient(135deg, #1e40af 0%, #fbbf24 50%, #dc2626 100%)'
            },
            banner: { mostrar: true, texto: '🎊 ¡Feliz Año Nuevo! 🎉', subtexto: 'Comenzando con todo este 2026' }
        },
        'septiembre': {
            nombre: 'Fiestas Patrias 🇲🇽',
            mes: 8, // Septiembre
            colores: {
                '--color-primario': '#006847',
                '--color-secundario': '#CE1126',
                '--color-acento': '#FFFFFF',
                '--color-fondo': '#f0f7f4',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #006847 0%, #FFFFFF 50%, #CE1126 100%)'
            },
            banner: { mostrar: true, texto: '🇲🇽 ¡Viva México! 🇲🇽', subtexto: 'Mes Patrio 2026' }
        },
        'octubre': {
            nombre: 'Halloween ',
            mes: 9, // Octubre
            colores: {
                '--color-primario': '#FF6B00',
                '--color-secundario': '#6B00FF',
                '--color-acento': '#00FF00',
                '--color-fondo': '#1a0f0f',
                '--color-texto': '#ffffff',
                '--gradiente-principal': 'linear-gradient(135deg, #FF6B00 0%, #6B00FF 50%, #000000 100%)'
            },
            banner: { mostrar: true, texto: '🎃 ¡Feliz Halloween! 👻', subtexto: 'Temporada de Terror 2026' }
        },
        'dia-muertos': {
            nombre: 'Día de Muertos ',
            mes: 10, // Noviembre
            colores: {
                '--color-primario': '#FF6B35',
                '--color-secundario': '#F7931E',
                '--color-acento': '#FF1493',
                '--color-fondo': '#fff5f0',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF1493 100%)'
            },
            banner: { mostrar: true, texto: '💀 Día de Muertos ', subtexto: 'Tradiciones Mexicanas 2026' }
        },
        'navidad': {
            nombre: 'Navidad 🎄',
            mes: 11, // Diciembre
            colores: {
                '--color-primario': '#C41E3A',
                '--color-secundario': '#165B33',
                '--color-acento': '#FFD700',
                '--color-fondo': '#fff5f5',
                '--color-texto': '#1a1a2e',
                '--gradiente-principal': 'linear-gradient(135deg, #C41E3A 0%, #FFD700 50%, #165B33 100%)'
            },
            banner: { mostrar: true, texto: ' ¡Feliz Navidad! 🎅', subtexto: 'Temporada Navideña 2026' }
        },
        'default': {
            nombre: 'Tema Clásico',
            mes: -1,
            colores: {
                '--color-primario': '#7c3aed',
                '--color-secundario': '#a78bfa',
                '--color-acento': '#ffffff',
                '--color-fondo': '#f5f0ff',
                '--color-texto': '#1e1b4b',
                '--gradiente-principal': 'linear-gradient(135deg, #c084fc, #7c3aed)'
            },
            banner: { mostrar: false }
        }
    },

    init() {
        this.detectarTemaPorMes();
        this.aplicarTema(this.temaActual);
        console.log('[Temas] Sistema inicializado - Tema actual:', this.temaActual);
    },

    detectarTemaPorMes() {
        const hoy = new Date();
        const mesActual = hoy.getMonth();

        for (const [temaKey, temaConfig] of Object.entries(this.temasPorMes)) {
            if (temaKey === 'default') continue;
            if (mesActual === temaConfig.mes) {
                this.temaActual = temaKey;
                return;
            }
        }
        this.temaActual = 'default';
    },

    aplicarTema(temaKey) {
        const tema = this.temasPorMes[temaKey];
        if (!tema) return;

        // 1. Aplicar variables CSS
        const root = document.documentElement;
        for (const [propiedad, valor] of Object.entries(tema.colores)) {
            root.style.setProperty(propiedad, valor);
        }

        // 2. Agregar clase al body
        document.body.classList.remove(...Object.keys(this.temasPorMes).map(t => `tema-${t}`));
        document.body.classList.add(`tema-${temaKey}`);

        // 3. Inyectar estilos para sobrescribir los hardcodeados en styles.css
        this.inyectarEstilos(tema);

        // 4. Mostrar/ocultar banner
        this.actualizarBanner(tema.banner);

        // 5. Guardar en localStorage
        localStorage.setItem('tema_activo', temaKey);
    },

    inyectarEstilos(tema) {
        let styleTag = document.getElementById('temas-estilos');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'temas-estilos';
            document.head.appendChild(styleTag);
        }
        
        const c1 = tema.colores['--color-primario'];
        const c2 = tema.colores['--color-secundario'];
        const bg = tema.colores['--color-fondo'];
        const grad = tema.colores['--gradiente-principal'];

        styleTag.textContent = `
            body {
                background: ${bg} !important;
            }
            .clay {
                border-top: 3px solid ${c1} !important;
                border-bottom: 3px solid ${c2} !important;
            }
            .btn-primary, .btn-nuevo, .btn-gasto, .btn-guardar, .btn-guardar-ingreso, .btn-guardar-gasto, .btn-generar {
                background: ${grad} !important;
            }
            .logo-icon, .modal-icono, .modal-icono.ingreso-icono, .modal-icono.gasto-icono {
                background: ${grad} !important;
            }
            .connection .dot.online, .connection .dot.green {
                background: ${c1} !important;
                box-shadow: 0 0 8px ${c1}80 !important;
            }
            .banner-festivo {
                margin: 0 -12px 16px -12px;
                padding: 24px 20px;
                background: ${grad};
                color: white;
                text-align: center;
                position: relative;
                overflow: hidden;
                animation: slideDown 0.5s ease;
            }
            @media (min-width: 769px) {
                .banner-festivo { margin: 0 -24px 20px -24px; }
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .banner-texto { font-size: 26px; font-weight: 800; margin-bottom: 6px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
            .banner-subtexto { font-size: 14px; opacity: 0.95; }
        `;
    },

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
            } else {
                document.body.insertBefore(banner, document.body.firstChild);
            }
        }

        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-texto">${config.texto}</div>
                <div class="banner-subtexto">${config.subtexto}</div>
            </div>
        `;
    },

    cambiarTema(temaKey) {
        if (this.temasPorMes[temaKey]) {
            this.temaActual = temaKey;
            this.aplicarTema(temaKey);
            console.log('[Temas] Tema cambiado manualmente a:', temaKey);
        }
    },

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

// NO usar export - hacerlo global
window.TemasManager = TemasManager;