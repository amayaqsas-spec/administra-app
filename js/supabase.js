// js/supabase.js - Conexión a Supabase

// ============================================
// CONFIGURACIÓN
// ============================================
const SUPABASE_URL = 'https://ncbbwhyvippnmkmyntoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6_metFcJd35fYjQtz5mXEA_V-1ofzH0';

// ============================================
// INICIALIZAR SUPABASE
// ============================================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================
async function loginUser(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
        return { success: true, data: data };
    } catch (error) {
        console.error('Error en login:', error);
        return { success: false, error: error.message };
    }
}

async function logoutUser() {
    try {
        await supabaseClient.auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Error en logout:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES CRUD - GRUPOS
// ============================================
async function getGrupos() {
    try {
        const { data, error } = await supabaseClient
            .from('grupos')
            .select('*')
            .order('nombre');
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener grupos:', error);
        return [];
    }
}

async function crearGrupo(nombre, profesor) {
    try {
        const { data, error } = await supabaseClient
            .from('grupos')
            .insert([{ nombre, profesor }])
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear grupo:', error);
        return { success: false, error: error.message };
    }
}

async function actualizarGrupo(id, nombre, profesor) {
    try {
        const { data, error } = await supabaseClient
            .from('grupos')
            .update({ nombre, profesor })
            .eq('id', id)
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar grupo:', error);
        return { success: false, error: error.message };
    }
}

async function eliminarGrupo(id) {
    try {
        const { error } = await supabaseClient
            .from('grupos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar grupo:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES CRUD - ALUMNOS
// ============================================
async function getAlumnos() {
    try {
        const { data, error } = await supabaseClient
            .from('alumnos')
            .select('*')
            .order('nombre');
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        return [];
    }
}

async function getAlumnosPorGrupo(grupoId) {
    try {
        const { data, error } = await supabaseClient
            .from('alumnos')
            .select('*')
            .eq('grupo_id', grupoId)
            .order('nombre');
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener alumnos del grupo:', error);
        return [];
    }
}

async function crearAlumno(alumno) {
    try {
        const { data, error } = await supabaseClient
            .from('alumnos')
            .insert([{
                id: alumno.id,
                grupo_id: alumno.grupoId,
                nombre: alumno.nombre,
                telefono: alumno.telefono,
                total: alumno.total,
                pagado: alumno.pagado,
                disponible: alumno.disponible,
                pago_con: alumno.pagoCon,
                nota: alumno.nota || ''
            }])
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear alumno:', error);
        return { success: false, error: error.message };
    }
}

async function actualizarAlumno(alumno) {
    try {
        const { data, error } = await supabaseClient
            .from('alumnos')
            .update({
                nombre: alumno.nombre,
                telefono: alumno.telefono,
                total: alumno.total,
                pagado: alumno.pagado,
                disponible: alumno.disponible,
                pago_con: alumno.pagoCon,
                nota: alumno.nota || ''
            })
            .eq('id', alumno.id)
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        return { success: false, error: error.message };
    }
}

async function eliminarAlumno(id) {
    try {
        const { error } = await supabaseClient
            .from('alumnos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES CRUD - GASTOS
// ============================================
async function getGastos() {
    try {
        const { data, error } = await supabaseClient
            .from('gastos')
            .select('*')
            .order('fecha', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener gastos:', error);
        return [];
    }
}

async function getGastosPorGrupo(grupoId) {
    try {
        const { data, error } = await supabaseClient
            .from('gastos')
            .select('*')
            .eq('grupo_id', grupoId)
            .order('fecha', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener gastos del grupo:', error);
        return [];
    }
}

async function crearGasto(gasto) {
    try {
        const { data, error } = await supabaseClient
            .from('gastos')
            .insert([{
                id: gasto.id,
                grupo_id: gasto.grupoId,
                fecha: gasto.fecha,
                descripcion: gasto.descripcion,
                tipo: gasto.tipo,
                monto: gasto.monto,
                participantes: gasto.participantes,
                nota: gasto.nota || '',
                excluidos: gasto.excluidos || []
            }])
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear gasto:', error);
        return { success: false, error: error.message };
    }
}

async function actualizarGasto(gasto) {
    try {
        const { data, error } = await supabaseClient
            .from('gastos')
            .update({
                grupo_id: gasto.grupoId,
                fecha: gasto.fecha,
                descripcion: gasto.descripcion,
                tipo: gasto.tipo,
                monto: gasto.monto,
                participantes: gasto.participantes,
                nota: gasto.nota || '',
                excluidos: gasto.excluidos || []
            })
            .eq('id', gasto.id)
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        return { success: false, error: error.message };
    }
}

async function eliminarGasto(id) {
    try {
        const { error } = await supabaseClient
            .from('gastos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// FUNCIONES CRUD - EXTRA NOTAS
// ============================================
async function getExtraNotas() {
    try {
        const { data, error } = await supabaseClient
            .from('extra_notas')
            .select('*')
            .order('fecha', { ascending: false });
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener extra notas:', error);
        return [];
    }
}

async function crearExtraNota(nota) {
    try {
        const { data, error } = await supabaseClient
            .from('extra_notas')
            .insert([{
                id: nota.id,
                fecha: nota.fecha,
                descripcion: nota.descripcion,
                nombre: nota.nombre,
                monto: nota.monto
            }])
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al crear extra nota:', error);
        return { success: false, error: error.message };
    }
}

async function actualizarExtraNota(nota) {
    try {
        const { data, error } = await supabaseClient
            .from('extra_notas')
            .update({
                fecha: nota.fecha,
                descripcion: nota.descripcion,
                nombre: nota.nombre,
                monto: nota.monto
            })
            .eq('id', nota.id)
            .select();
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Error al actualizar extra nota:', error);
        return { success: false, error: error.message };
    }
}

async function eliminarExtraNota(id) {
    try {
        const { error } = await supabaseClient
            .from('extra_notas')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error al eliminar extra nota:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// EXPORTAR FUNCIONES
// ============================================
window.supabaseClient = supabaseClient;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.getGrupos = getGrupos;
window.crearGrupo = crearGrupo;
window.actualizarGrupo = actualizarGrupo;
window.eliminarGrupo = eliminarGrupo;
window.getAlumnos = getAlumnos;
window.getAlumnosPorGrupo = getAlumnosPorGrupo;
window.crearAlumno = crearAlumno;
window.actualizarAlumno = actualizarAlumno;
window.eliminarAlumno = eliminarAlumno;
window.getGastos = getGastos;
window.getGastosPorGrupo = getGastosPorGrupo;
window.crearGasto = crearGasto;
window.actualizarGasto = actualizarGasto;
window.eliminarGasto = eliminarGasto;
window.getExtraNotas = getExtraNotas;
window.crearExtraNota = crearExtraNota;
window.actualizarExtraNota = actualizarExtraNota;
window.eliminarExtraNota = eliminarExtraNota;

console.log('[Supabase] Conectado correctamente');