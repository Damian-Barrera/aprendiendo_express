const form = document.getElementById("loginForm");
const areaName = document.querySelector(".nombre");
const areaApellido = document.querySelector(".apellido");
const areaTelefono = document.querySelector(".tel");
const mensajeError = document.getElementById("mensajeError");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  mensajeError.textContent = "";

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("telefono").value;

  fetch("/datos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ nombre, apellido, telefono }),
  })
    .then((res) => res.json())
    .then((data) => {
      areaName.textContent = data.nombre;
      areaApellido.textContent = data.apellido;
      areaTelefono.textContent = data.telefono;
    })
    .catch( error => {
        console.error('Error al enviar los datos: ', error);
        mensajeError.textContent = "Ocurrio un error al enviar los datos. Intantalo de nuevo mas tarde";
    })
});
