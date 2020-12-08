// const argv = require("yargs").argv;
const argv = require(`./config/yargs`).argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];
let tareas = [];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea, `-- Ha sido agregada a la lista de tareas`);
        break;
    case 'listar':
        if (argv.completado !== undefined) {
            console.log(porHacer.filtrar(argv.completado));
        } else {

            let listado = porHacer.getListado();
            for (let tarea of listado) {
                console.log('========= Tareas =================='.green);
                console.log(tarea.descripcion);
                console.log('Estado:', tarea.completado);
                console.log('==================================='.green);
            }
        }
        break;
    case 'actualizar':
        porHacer.actualizar(argv.descripcion, argv.completado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log('Elemento borrado?', borrado);
        break;
    default:
        console.log('Comando no es reconocido');
        break;
}
console.log(tareas);