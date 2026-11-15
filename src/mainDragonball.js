import { mostrarPersonajes, obtenerPersonajes } from './api/dragonBall'
import './style.css'

// probando si salen los personajes de dragonball
//const personajes = await obtenerPersonajes();
//accediendo al arreglo de los personajes
//console.log(personajes)

const lista = await mostrarPersonajes()
lista

document.querySelector('#app').innerHTML = `
    ${lista}
`

