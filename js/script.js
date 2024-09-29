let movieList = []
function showMovieInfo(movieId) {
  let body = document.getElementsByTagName("body")[0];

  let movie = movieList.find((movie) => movie.id == movieId);

  document.querySelectorAll(".offcanvas").forEach((offcanvas) => {
    offcanvas.remove();
  });

  body.innerHTML += `
    <div id="offcanvasTop"
      class="offcanvas offcanvas-top show border-danger text-bg-dark" tabindex="-1" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">${movie.title}</h5>
      <button type="button" class="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      ${movie.overview}
    </div>
    <hr>
    <div class="offcanvas-body card-body">
      <div class="row">
        <div class="col">
          ${movie.genres.map((genre) => genre.name).join(" - ")}
        </div>
        <div class="col text-end">
          <div class="dropdown position-absolute end-0 me-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              More
            </button>
            <ul class="dropdown-menu dropdown-menu-end ">
              <li class="dropdown-item">
                <div class="row flex-nowrap">
                  <div class="col text-start">Year:</div>
                  <div class="col text-end">${movie.release_date}</div>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="row flex-nowrap">
                  <div class="col text-start">Runtime:</div>
                  <div class="col text-end">${movie.runtime}</div>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="row flex-nowrap">
                  <div class="col text-start">Budget:</div>
                  <div class="col text-end">${movie.budget}</div>
                </div>
              </li>
              <li class="dropdown-item">
                <div class="row flex-nowrap">
                  <div class="col text-start">Revenue:</div>
                  <div class="col text-end">${movie.revenue}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Initialize the offcanvas component
  let offcanvasElement = document.getElementById("offcanvasTop");
  let offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.show();
}

document.addEventListener("DOMContentLoaded", function () {
  //1. Cuando la página cargue, deberá traer el listado de información sobre películas disponible
  let movies_api = "https://japceibal.github.io/japflix_api/movies-data.json"; //Link del API que continene la lista de peliculas
  let container_list = document.getElementById("lista"); //Lugar donde se mostrara lo que viene del link de arriba, es decir la lista de peliculas
  let btnsearch = document.getElementById("btnBuscar");
  let searchtext = document.getElementById("inputBuscar");
  let movieinfo = document.getElementById("movie-info");
  let movieinfodropdown = document.getElementById("dropdownbtn");

  // Función para convertir la votación numérica (sobre 10) en estrellas (sobre 5)
  function getStars(stars) {
    let scaledVote = stars / 2; // Escalar la votación de 10 a 5
    let fullStars = Math.floor(scaledVote); // Estrellas llenas
    let emptyStars = 5 - fullStars; // Estrellas vacías

    let starsHtml = "";

    // Añadir estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      starsHtml += `<span class="fa fa-star checked"></span>`;
    }

    // Añadir estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += `<span class="fa fa-star"></span>`;
    }

    return starsHtml;
  }

  //Función que mestra las peliculas buscadas
  function showMovies(moviesArray) {
    container_list.innerHTML = "";
    for (let movie of moviesArray) {
      container_list.innerHTML += `
      <div
      onclick="showMovieInfo('${movie.id}')"
      class="card bg-transparent shadow-sm text-bg-dark mb-5 text-bg-dark text-center border-danger border-5 border-bottom"  data-bs-toggle="popover">
        <h5 class="card-title card-header  border-secondary">${movie.title}</h5>
        <span class="card-text card-body ">${movie.tagline}</span>
        <div class="card-footer" > ${getStars(movie.vote_average)}</div>
      </div>`;
    }
  }

  // Se carga el archivo JSON
  fetch(movies_api)
    //si la respuesta es correcta, se convierte a JSON
    .then((response) => response.json())
    // Entonces, se muestra la información en la consola
    .then((data) => {
      //2.Cuando el usuario presiona el botón buscar, y si previamente ingresó algún valor en el campo de búsqueda, deberá mostrar un listado con las películas que coincidan con dicha búsqueda en sus atributos de title o genres o tagline u overview. La información a mostrar en este punto será: title, tagline, y vote_average (en formato de "estrellas").
      btnsearch.addEventListener("click", function () {
        // Obtengo el texto para la búsqueda ingresado por el usuario
        let searchtextLower = searchtext.value.toLowerCase();

        // Filtrar las películas que coincidan con la búsqueda
        let filteredMovies = data.filter((movie) => {
          return (
            movie.title.toLowerCase().includes(searchtextLower) ||
            movie.tagline.toLowerCase().includes(searchtextLower) ||
            movie.overview.toLowerCase().includes(searchtextLower) ||
            movie.genres
              .map((genre) => genre.name.toLowerCase())
              .includes(searchtextLower)
          );
        });

        // Llama a la función que muestra las películas con los datos obtenidos
        showMovies(filteredMovies);
        movieList = filteredMovies;
      });
    })
    .catch((error) => {
      console.log("Error en la carga de películas");
    });
});
