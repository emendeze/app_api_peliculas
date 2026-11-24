// Importamos las funciones de la API y los estilos CSS
import { obtenerPeliculasPopulares, buscarPeliculasPorTitulo } from './api/peliculas';
import './style.css'

// Pruebas en consola de las funciones de la API
const peliculas = await obtenerPeliculasPopulares()
console.log(peliculas)

const buscarPelicula = await buscarPeliculasPorTitulo("Terminator")
console.log(buscarPelicula)

// 1. Llamando elementos del HTML
const resultados = document.querySelector("#resultados")
const mensaje = document.querySelector("#mensaje")
const inputBuscar = document.querySelector("#inputBuscar")
const btnBuscar = document.querySelector("#btnBuscar")
const btnPopulares = document.querySelector("#btnPopulares")
const btnAnterior = document.querySelector("#btnAnterior")
const btnSiguiente = document.querySelector("#btnSiguiente")
const paginaActual = document.querySelector("#paginaActual")

// Variables para controlar la paginación
let pagina = 1
let totalPaginas = 1
let modoBusqueda = false // false = viendo populares | true = viendo búsqueda

// Función auxiliar para actualizar el texto y estado de los botones de paginación
function actualizarPaginacion() {
  paginaActual.textContent = `Página ${pagina} de ${totalPaginas}`
  btnAnterior.disabled = pagina <= 1
  btnSiguiente.disabled = pagina >= totalPaginas
}

// 2. Función para dibujar las tarjetas de películas en pantalla
function mostrarPeliculas(peliculas) {
  // Limpiamos el contenedor antes de mostrar nuevos resultados
  resultados.innerHTML = "";

  // Recorremos cada película y creamos su tarjeta HTML
  peliculas.map((pelicula) => {
    // Obtenemos solo el año (primeros 4 caracteres) o "Sin fecha" si no tiene
    const anio = pelicula.release_date ? pelicula.release_date.slice(0, 4) : "Sin fecha";
    // Mostramos la sinopsis o un mensaje por defecto si viene vacía
    const sinopsis = pelicula.overview || "Sin sinopsis disponible.";
    // Armamos la URL del póster o usamos una imagen genérica si no tiene
    const poster = pelicula.poster_path
      ? `https://image.tmdb.org/t/p/w300${pelicula.poster_path}`
      : "https://placehold.co/300x450?text=Sin+imagen";

    // Agregamos la tarjeta al contenedor de resultados
    resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${poster}" alt="${pelicula.title}" />
        <h3>${pelicula.title}</h3>
        <p class="anio">${anio}</p>
        <p class="sinopsis">${sinopsis}</p>
      </div>
    `;
  });
}

// 3. Función para obtener y mostrar las películas populares
async function cargarPopulares() {
  modoBusqueda = false;
  mensaje.textContent = "Cargando...";
  try {
    // Consultamos las películas populares a la API enviando la página actual
    const data = await obtenerPeliculasPopulares(pagina);
    totalPaginas = data.total_pages;
    mensaje.textContent = "";
    // Mostramos la lista de películas y actualizamos la paginación
    mostrarPeliculas(data.results);
    actualizarPaginacion();
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}

// 4. Función para buscar una película por el título escrito en el input
async function buscar() {
  // Obtenemos el texto del input sin espacios al inicio o al final
  const texto = inputBuscar.value.trim();

  // Validamos que el usuario haya escrito algo
  if (texto === "") {
    mensaje.textContent = "Escribe el nombre de una película.";
    return;
  }

  modoBusqueda = true;
  mensaje.textContent = "Cargando...";
  try {
    // Consultamos la película por título en la API enviando la página actual
    const data = await buscarPeliculasPorTitulo(texto, pagina);

    // Si no hay coincidencias, mostramos mensaje de que no se encontró
    if (data.results.length === 0) {
      resultados.innerHTML = "";
      mensaje.textContent = "Película no encontrada";
      return;
    }

    totalPaginas = data.total_pages;
    // Limpiamos el mensaje, mostramos las películas encontradas y actualizamos paginación
    mensaje.textContent = "";
    mostrarPeliculas(data.results);
    actualizarPaginacion();
  } catch (error) {
    resultados.innerHTML = "";
    mensaje.textContent = "Error de conexión. Intenta de nuevo más tarde.";
  }
}

// 5. Cargamos las películas populares al abrir la página
cargarPopulares();

// 6. Eventos de clic para los botones de Buscar y Ver populares
btnBuscar.addEventListener("click", () => {
  pagina = 1; // Reiniciamos a la página 1 al hacer una nueva búsqueda
  buscar();
})

btnPopulares.addEventListener("click", () => {
  pagina = 1; // Reiniciamos a la página 1 al volver a populares
  inputBuscar.value = "";
  cargarPopulares();
})

// 7. Eventos de clic para los botones de paginación (Anterior y Siguiente)
btnSiguiente.addEventListener("click", () => {
  if (pagina < totalPaginas) {
    pagina++;
    modoBusqueda ? buscar() : cargarPopulares();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
})

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    modoBusqueda ? buscar() : cargarPopulares();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
})