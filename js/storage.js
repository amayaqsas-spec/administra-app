// js/storage.js - Gestión de datos LOCAL (LocalStorage)

// ============================================
// FUNCIONES CRUD - GRUPOS
// ============================================
function getGrupos() {
    const data = localStorage.getItem('grupos');
    return data ? JSON.parse(data) : [];
}

function guardarGrupos(grupos) {
    localStorage.setItem('grupos', JSON.stringify(grupos));
}

function crearGrupoLocal(nombre, profesor, telefono) {
    const grupos = getGrupos();
    const nextId = grupos.length > 0 ? Math.max(...grupos.map(g => g.id)) + 1 : 1;
    const nuevoGrupo = {
        id: nextId,
        nombre: nombre,
        profesor: profesor || 'Sin maestro asignado',
        telefono: telefono || '',
        dinero: 0
    };
    grupos.push(nuevoGrupo);
    guardarGrupos(grupos);
    return { success: true, data: nuevoGrupo };
}

function actualizarGrupoLocal(id, nombre, profesor, telefono) {
    const grupos = getGrupos();
    const grupo = grupos.find(g => g.id === id);
    if (!grupo) return { success: false, error: 'Grupo no encontrado' };
    grupo.nombre = nombre;
    grupo.profesor = profesor || 'Sin maestro asignado';
    grupo.telefono = telefono || '';
    guardarGrupos(grupos);
    return { success: true, data: grupo };
}

function eliminarGrupoLocal(id) {
    let grupos = getGrupos();
    grupos = grupos.filter(g => g.id !== id);
    guardarGrupos(grupos);
    return { success: true };
}

// ============================================
// FUNCIONES CRUD - ALUMNOS
// ============================================
function getAlumnos() {
    const data = localStorage.getItem('alumnos');
    return data ? JSON.parse(data) : [];
}

function guardarAlumnos(alumnos) {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function getAlumnosPorGrupo(grupoId) {
    const alumnos = getAlumnos();
    return alumnos.filter(a => a.grupoId === grupoId);
}

function crearAlumnoLocal(alumno) {
    const alumnos = getAlumnos();
    const nextId = alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) + 1 : 1;
    const nuevoAlumno = {
        id: nextId,
        grupoId: alumno.grupoId,
        nombre: alumno.nombre,
        telefono: alumno.telefono,
        total: alumno.total || 0,
        pagado: alumno.pagado || 0,
        disponible: alumno.disponible || 0,
        pagoCon: alumno.pagoCon || 'Efectivo',
        fechaPago: alumno.fechaPago || '',
        nota: alumno.nota || ''
    };
    alumnos.push(nuevoAlumno);
    guardarAlumnos(alumnos);
    return { success: true, data: nuevoAlumno };
}

function actualizarAlumnoLocal(alumno) {
    const alumnos = getAlumnos();
    const index = alumnos.findIndex(a => a.id === alumno.id);
    if (index === -1) return { success: false, error: 'Alumno no encontrado' };
    alumnos[index] = alumno;
    guardarAlumnos(alumnos);
    return { success: true, data: alumno };
}

function eliminarAlumnoLocal(id) {
    let alumnos = getAlumnos();
    alumnos = alumnos.filter(a => a.id !== id);
    guardarAlumnos(alumnos);
    return { success: true };
}

// ============================================
// FUNCIONES CRUD - GASTOS COMPARTIDOS
// ============================================
function getGastos() {
    const data = localStorage.getItem('gastos');
    return data ? JSON.parse(data) : [];
}

function guardarGastos(gastos) {
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

function getGastosPorGrupo(grupoId) {
    const gastos = getGastos();
    return gastos.filter(g => g.grupoId === grupoId);
}

function crearGastoLocal(gasto) {
    const gastos = getGastos();
    const nextId = gastos.length > 0 ? Math.max(...gastos.map(g => g.id)) + 1 : 1;
    const nuevoGasto = {
        id: nextId,
        grupoId: gasto.grupoId,
        fecha: gasto.fecha,
        descripcion: gasto.descripcion,
        tipo: gasto.tipo || 'Otro',
        monto: gasto.monto || 0,
        participantes: gasto.participantes || 0,
        nota: gasto.nota || '',
        deudores: gasto.deudores || []
    };
    gastos.push(nuevoGasto);
    guardarGastos(gastos);
    return { success: true, data: nuevoGasto };
}

function actualizarGastoLocal(gasto) {
    const gastos = getGastos();
    const index = gastos.findIndex(g => g.id === gasto.id);
    if (index === -1) return { success: false, error: 'Gasto no encontrado' };
    gastos[index] = gasto;
    guardarGastos(gastos);
    return { success: true, data: gasto };
}

function eliminarGastoLocal(id) {
    let gastos = getGastos();
    gastos = gastos.filter(g => g.id !== id);
    guardarGastos(gastos);
    return { success: true };
}

// ============================================
// FUNCIONES CRUD - GASTOS DIRECTOS
// ============================================
function getGastosDirectos() {
    const data = localStorage.getItem('gastosDirectos');
    return data ? JSON.parse(data) : [];
}

function guardarGastosDirectos(gastos) {
    localStorage.setItem('gastosDirectos', JSON.stringify(gastos));
}

function crearGastoDirectoLocal(gasto) {
    const gastos = getGastosDirectos();
    const nextId = gastos.length > 0 ? Math.max(...gastos.map(g => g.id)) + 1 : 1;
    const nuevoGasto = {
        id: nextId,
        fecha: gasto.fecha,
        descripcion: gasto.descripcion,
        tipo: 'Directo',
        monto: gasto.monto || 0,
        participantes: 1,
        nota: gasto.nota || '',
        excluidos: []
    };
    gastos.push(nuevoGasto);
    guardarGastosDirectos(gastos);
    return { success: true, data: nuevoGasto };
}

function actualizarGastoDirectoLocal(gasto) {
    const gastos = getGastosDirectos();
    const index = gastos.findIndex(g => g.id === gasto.id);
    if (index === -1) return { success: false, error: 'Gasto no encontrado' };
    gastos[index] = gasto;
    guardarGastosDirectos(gastos);
    return { success: true, data: gasto };
}

function eliminarGastoDirectoLocal(id) {
    let gastos = getGastosDirectos();
    gastos = gastos.filter(g => g.id !== id);
    guardarGastosDirectos(gastos);
    return { success: true };
}

// ============================================
// FUNCIONES CRUD - EXTRA NOTAS
// ============================================
function getExtraNotas() {
    const data = localStorage.getItem('extraNotas');
    return data ? JSON.parse(data) : [];
}

function guardarExtraNotas(notas) {
    localStorage.setItem('extraNotas', JSON.stringify(notas));
}

function crearExtraNotaLocal(nota) {
    const notas = getExtraNotas();
    const nextId = notas.length > 0 ? Math.max(...notas.map(n => n.id)) + 1 : 1;
    const nuevaNota = {
        id: nextId,
        fecha: nota.fecha,
        descripcion: nota.descripcion,
        nombre: nota.nombre,
        monto: nota.monto || 0
    };
    notas.push(nuevaNota);
    guardarExtraNotas(notas);
    return { success: true, data: nuevaNota };
}

function actualizarExtraNotaLocal(nota) {
    const notas = getExtraNotas();
    const index = notas.findIndex(n => n.id === nota.id);
    if (index === -1) return { success: false, error: 'Nota no encontrada' };
    notas[index] = nota;
    guardarExtraNotas(notas);
    return { success: true, data: nota };
}

function eliminarExtraNotaLocal(id) {
    let notas = getExtraNotas();
    notas = notas.filter(n => n.id !== id);
    guardarExtraNotas(notas);
    return { success: true };
}

// ============================================
// FUNCIONES CRUD - INGRESOS EXTERNOS
// ============================================
function getIngresosExternos() {
    const data = localStorage.getItem('ingresosExternos');
    return data ? JSON.parse(data) : [];
}

function guardarIngresosExternos(ingresos) {
    localStorage.setItem('ingresosExternos', JSON.stringify(ingresos));
}

function crearIngresoExternoLocal(ingreso) {
    const ingresos = getIngresosExternos();
    const nextId = ingresos.length > 0 ? Math.max(...ingresos.map(i => i.id)) + 1 : 1;
    const nuevoIngreso = {
        id: nextId,
        fecha: ingreso.fecha,
        descripcion: ingreso.descripcion,
        monto: ingreso.monto || 0
    };
    ingresos.push(nuevoIngreso);
    guardarIngresosExternos(ingresos);
    return { success: true, data: nuevoIngreso };
}

function actualizarIngresoExternoLocal(ingreso) {
    const ingresos = getIngresosExternos();
    const index = ingresos.findIndex(i => i.id === ingreso.id);
    if (index === -1) return { success: false, error: 'Ingreso no encontrado' };
    ingresos[index] = ingreso;
    guardarIngresosExternos(ingresos);
    return { success: true, data: ingreso };
}

function eliminarIngresoExternoLocal(id) {
    let ingresos = getIngresosExternos();
    ingresos = ingresos.filter(i => i.id !== id);
    guardarIngresosExternos(ingresos);
    return { success: true };
}

// ============================================
// EXPORTAR FUNCIONES
// ============================================
window.getGrupos = getGrupos;
window.crearGrupo = crearGrupoLocal;
window.actualizarGrupo = actualizarGrupoLocal;
window.eliminarGrupo = eliminarGrupoLocal;
window.getAlumnos = getAlumnos;
window.getAlumnosPorGrupo = getAlumnosPorGrupo;
window.crearAlumno = crearAlumnoLocal;
window.actualizarAlumno = actualizarAlumnoLocal;
window.eliminarAlumno = eliminarAlumnoLocal;
window.getGastos = getGastos;
window.getGastosPorGrupo = getGastosPorGrupo;
window.crearGasto = crearGastoLocal;
window.actualizarGasto = actualizarGastoLocal;
window.eliminarGasto = eliminarGastoLocal;
window.getGastosDirectos = getGastosDirectos;
window.crearGastoDirecto = crearGastoDirectoLocal;
window.actualizarGastoDirecto = actualizarGastoDirectoLocal;
window.eliminarGastoDirecto = eliminarGastoDirectoLocal;
window.getExtraNotas = getExtraNotas;
window.crearExtraNota = crearExtraNotaLocal;
window.actualizarExtraNota = actualizarExtraNotaLocal;
window.eliminarExtraNota = eliminarExtraNotaLocal;
window.getIngresosExternos = getIngresosExternos;
window.crearIngresoExterno = crearIngresoExternoLocal;
window.actualizarIngresoExterno = actualizarIngresoExternoLocal;
window.eliminarIngresoExterno = eliminarIngresoExternoLocal;

console.log('[Storage] Modo LOCAL activado');