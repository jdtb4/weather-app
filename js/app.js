const container = document.querySelector(".container");
const buscadorBtn = document.querySelector(".container-buscador button");
const error = document.querySelector(".not-found");
const tiempo = document.querySelector(".container-tiempo");
const detallesTiempo = document.querySelector(".detalles-tiempo");
const buscador = document.querySelector(".container-buscador input");

// Eventos
window.addEventListener("load", () => {
  buscadorBtn.addEventListener("click", buscarTiempo);
});

// Funciones
function buscarTiempo(e) {
  e.preventDefault();

  const ciudad = document.querySelector(".container-buscador input").value;
  if (ciudad === "") {
    container.style.height = "530px";
    error.style.display = "block";
    error.style.scale = "1";

    mostrarError("Por favor ingresa una ciudad");

    setTimeout(() => {
      container.style.height = "100px";
      error.style.display = "none";
      error.style.scale = "0";
    }, 3000);
    return;
  }

  consultarAPI(ciudad);
}

// Inyecta un mensaje de error en el HTML
function mostrarError(mensaje) {
  const alerta = document.querySelector(".not-found p");
  alerta.textContent = mensaje;
}

/* function consultarAPI(ciudad) {
  const apiKey = "fb154294fc45dfa9596241167b0ac259";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      if (datos.cod === "404") {
        container.style.height = "400px";
        tiempo.style.display = "none";
        detallesTiempo.style.display = "none";
        error.style.display = "block";

        return;
      }
      mostrasTiempo(datos);
    });
}
function mostrasTiempo(datos) {
  container.style.height = "600px";
  tiempo.style.display = "block";
  detallesTiempo.style.display = "block";
  error.style.display = "none";
} */
