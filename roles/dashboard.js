 // obtener token del localStorage
const token = localStorage.getItem("token");
const usuarioEl = document.getElementById("usuario");

if (!token) {
  // si no hay token, redirigir al login
  window.location.href = "/login";
} else {
  // decodificar el payload del JWT
  const payload = JSON.parse(atob(token.split(".")[1]));
  
  // mostrar datos del usuario
  usuarioEl.textContent = `Hola, ${payload.nombre} (Admin: ${payload.is_admin})`;
}
