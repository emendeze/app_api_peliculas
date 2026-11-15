// capa de consumo de la API Peliculas

// declarando las variables de entorno
const API_KEY = import.meta.env.VITE_API_KEY_API
const BASE_URL = import.meta.env.VITE_URL_BASE_API

export async function obtenerPeliculasPopulares() {

    // fetch => es el metodo que permite consumir un endpoint de una API (GET)
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=es-MX`) //promesa (respuesta donde se puede cumplir o no)

    // data recibe los datos ya formateados en json para poder trabajar con ellos
    const data = await response.json()
    return data
}

export async function buscarPeliculasPorTitulo(titulo) {
    // encodeURIComponent codifica los espacios y caracteres especiales para la URL
    const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=es-MX`)
    const data = await response.json()
    return data
}