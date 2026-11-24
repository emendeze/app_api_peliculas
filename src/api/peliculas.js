// Capa de consumo de la API de Películas (TMDB)

// Variables de entorno desde el archivo .env
const API_KEY = import.meta.env.VITE_API_KEY_API
const BASE_URL = import.meta.env.VITE_URL_BASE_API

// Función para obtener la lista de películas populares (recibe el número de página)
export async function obtenerPeliculasPopulares(pagina = 1) {
    // Realizamos la petición GET al endpoint de películas populares indicando la página
    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=es-MX&page=${pagina}`)

    // Convertimos la respuesta a formato JSON y la retornamos
    const data = await response.json()
    return data
}

// Función para buscar películas por su título (recibe título y número de página)
export async function buscarPeliculasPorTitulo(titulo, pagina = 1) {
    // encodeURIComponent adapta espacios y caracteres especiales para la URL
    const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=es-MX&page=${pagina}`)

    // Convertimos la respuesta a formato JSON y la retornamos
    const data = await response.json()
    return data
}