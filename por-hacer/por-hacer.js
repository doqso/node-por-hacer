const {
    log
} = require('console');
const {
    WSA_E_CANCELLED
} = require('constants');
const fs = require('fs');
const {
    boolean
} = require('yargs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`./db/data.json`, data, err => {
        if (err) throw new Error('No se pudo grabar', err);
        console.log(`La tarea ha sido guardada satisfactoriamente`);
    })
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
        console.log('No ha cargado bien el JSON');
    }

    // console.log(listadoPorHacer);
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        switch (completado) {
            case "false":
                completado = false;
                break;
            default:
                completado = true;
                break;
        }
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true
    } else {
        console.log('Esa tarea no existe');
        false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })
    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    // let elementoPorBorrar = listadoPorHacer.findIndex(elem => elem.descripcion === descripcion);
    // if (elementoPorBorrar === -1){
    //     return false;
    // } else{
    //     listadoPorHacer.splice(elementoPorBorrar, 1);
    //     guardarDB();
    //     return true;
    // }
}

const filtrar = booleano => {
    cargarDB();
    if (booleano !== Boolean(booleano)) {
        switch (booleano) {
            case "true":
                booleano = true;
                break;
            case "t":
                booleano = true;
                break;
            case "false":
                booleano = false;
                break;
            case "f":
                booleano = false;
                break;
            default:
                return 'No ha sido posible reconocer el booleano'.red;
        }
    }
    console.log('seleccion:', booleano);
    let listaFiltrada = listadoPorHacer.filter(tarea => tarea.completado === booleano);
    return listaFiltrada;
}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    filtrar
}