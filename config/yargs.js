const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command(`crear`, 'Crea algo, no se xd', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borrar un elemento de tareas', {
        descripcion
    })
    .command('listar', 'Mostrar resultados', {
        completado: {
            alias: 'c',
            desc: 'Indica si está completado o no la tarea'
        }
    })
    .help().argv;

module.exports = {
    argv
}