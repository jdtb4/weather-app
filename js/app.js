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
  //Validar que el input no este vacio
  const ciudad = document.querySelector(".container-buscador input").value;
  if (ciudad === "") {
    container.style.height = "530px";
    error.style.display = "block";
    error.style.scale = "1";

    mostrarError("Por favor ingresa una ciudad");
    // Desaparece el mensaje de error despues de 3 segundos
    setTimeout(() => {
      container.style.height = "100px";
      error.style.display = "none";
      error.style.scale = "0";
    }, 3000);
    return;
  }
  // Consultar la API
  consultarAPI(ciudad);
}

// Inyecta un mensaje de error en el HTML
function mostrarError(mensaje) {
  const alerta = document.querySelector(".not-found p");
  alerta.textContent = mensaje;
}

function consultarAPI(ciudad) {
  const apiKey = "fb154294fc45dfa9596241167b0ac259";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&lang=es&units=metric`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      if (datos.cod === "404") {
        container.style.height = "530px";
        error.style.display = "block";
        error.style.scale = "1";

        mostrarError("Ciudad no encontrada");
        setTimeout(() => {
          container.style.height = "100px";
          error.style.display = "none";
          error.style.scale = "0";
        }, 3000);

        return;
      }
      mostrarTiempo(datos);
    });
}
function mostrarTiempo(datos) {
  const img = document.querySelector(".container-tiempo img");
  const temperatura = document.querySelector(".temperatura");
  const descripcion = document.querySelector(".descripcion");
  const humedad = document.querySelector(".humedad span");
  const viento = document.querySelector(".viento span");

  container.style.height = "530px";
  tiempo.style.display = "block";
  tiempo.style.scale = "1";
  detallesTiempo.style.scale = "1";

  //Mostrar los datos en el HTML
  console.log(datos);
  const {
    main: { temp, humidity },
    wind: { speed },
    weather: [{ description, icon }],
  } = datos;

  const grados = parseInt(temp);
  img.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  temperatura.textContent = `${grados}°C`;
  descripcion.textContent = description;
  humedad.textContent = `${humidity}%`;
  viento.textContent = `${speed} m/s`;
}
