// offline-manager.js - Gestor de estado offline/online y sincronización
class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.pendingSync = [];
        this.syncInterval = null;
        this.listeners = [];
        
        this.init();
    }

    init() {
        // Escuchar cambios de conectividad
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // Cargar datos pendientes de LocalStorage
        this.loadPendingSync();
        
        // Iniciar chequeo periódico
        this.startPeriodicCheck();
        
        console.log('[OfflineManager] Inicializado - Estado:', this.isOnline ? 'Online' : 'Offline');
    }

    handleOnline() {
        this.isOnline = true;
        this.updateUI();
        console.log('[OfflineManager] Conexión recuperada');
        
        // Intentar sincronizar datos pendientes
        this.syncPendingData();
        
        // Disparar eventos a los listeners
        this.notifyListeners('online');
    }

    handleOffline() {
        this.isOnline = false;
        this.updateUI();
        console.log('[OfflineManager] Conexión perdida');
        
        // Disparar eventos a los listeners
        this.notifyListeners('offline');
    }

    updateUI() {
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        
        if (!dot || !text) return;
        
        if (this.isOnline) {
            if (this.hasPendingData()) {
                // Online pero con datos pendientes
                dot.className = 'w-3 h-3 rounded-full bg-yellow-400 animate-pulse';
                text.textContent = 'Sincronizando...';
                text.className = 'text-xs text-yellow-600';
            } else {
                // Online y sincronizado
                dot.className = 'w-3 h-3 rounded-full bg-green-400';
                text.textContent = 'Conectado';
                text.className = 'text-xs text-green-600';
            }
        } else {
            // Offline
            dot.className = 'w-3 h-3 rounded-full bg-orange-400 animate-pulse';
            text.textContent = 'Offline';
            text.className = 'text-xs text-orange-600';
        }
    }

    hasPendingData() {
        return this.pendingSync.length > 0;
    }

    loadPendingSync() {
        try {
            const data = localStorage.getItem('pendingSync');
            if (data) {
                this.pendingSync = JSON.parse(data);
            }
        } catch (error) {
            console.error('[OfflineManager] Error cargando datos pendientes:', error);
            this.pendingSync = [];
        }
        this.updateUI();
    }

    savePendingSync() {
        try {
            localStorage.setItem('pendingSync', JSON.stringify(this.pendingSync));
        } catch (error) {
            console.error('[OfflineManager] Error guardando datos pendientes:', error);
        }
        this.updateUI();
    }

    // Agregar operación para sincronizar cuando vuelva la conexión
    addPendingOperation(operation) {
        this.pendingSync.push({
            ...operation,
            timestamp: new Date().toISOString(),
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        });
        this.savePendingSync();
        this.updateUI();
        
        // Si estamos online, intentar sincronizar inmediatamente
        if (this.isOnline) {
            this.syncPendingData();
        }
        
        console.log('[OfflineManager] Operación agregada a pendientes:', operation);
    }

    // Sincronizar datos pendientes con Supabase
    async syncPendingData() {
        if (!this.isOnline || this.pendingSync.length === 0) {
            return;
        }

        console.log(`[OfflineManager] Sincronizando ${this.pendingSync.length} operaciones pendientes...`);
        
        // Marcar como sincronizando
        this.updateUI();
        
        // Procesar cada operación
        const failedOperations = [];
        
        for (const operation of this.pendingSync) {
            try {
                // Aquí iría la lógica de sincronización con Supabase
                // Por ahora simulamos éxito
                await this.processOperation(operation);
                console.log('[OfflineManager] Operación sincronizada:', operation.id);
            } catch (error) {
                console.error('[OfflineManager] Error sincronizando operación:', operation.id, error);
                failedOperations.push(operation);
            }
        }
        
        // Actualizar lista de pendientes
        if (failedOperations.length === 0) {
            this.pendingSync = [];
            console.log('[OfflineManager] Todas las operaciones sincronizadas');
        } else {
            this.pendingSync = failedOperations;
            console.log(`[OfflineManager] ${failedOperations.length} operaciones fallaron`);
        }
        
        this.savePendingSync();
        this.updateUI();
        
        // Notificar a los listeners
        this.notifyListeners('syncComplete');
    }

    // Procesar una operación (simulado)
    async processOperation(operation) {
        // Simular retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simular éxito (90% de éxito)
        if (Math.random() > 0.1) {
            return true;
        } else {
            throw new Error('Error simulado en sincronización');
        }
    }

    // Chequeo periódico de conectividad
    startPeriodicCheck() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        
        this.syncInterval = setInterval(() => {
            if (this.isOnline && this.hasPendingData()) {
                this.syncPendingData();
            }
        }, 30000); // Cada 30 segundos
    }

    // Sistema de eventos
    addListener(callback) {
        this.listeners.push(callback);
    }

    notifyListeners(event) {
        this.listeners.forEach(callback => {
            try {
                callback(event, this.isOnline, this.pendingSync.length);
            } catch (error) {
                console.error('[OfflineManager] Error en listener:', error);
            }
        });
    }

    // Métodos públicos
    getStatus() {
        return {
            isOnline: this.isOnline,
            pendingCount: this.pendingSync.length,
            hasPending: this.hasPendingData()
        };
    }

    // Forzar sincronización manual
    forceSync() {
        if (this.isOnline) {
            this.syncPendingData();
        } else {
            console.warn('[OfflineManager] No se puede sincronizar: offline');
            return false;
        }
        return true;
    }
}

// Inicializar el gestor de offline
const offlineManager = new OfflineManager();
window.offlineManager = offlineManager;

// Exportar para usar en otros scripts
export default offlineManager;