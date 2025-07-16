const btn = document.querySelector(".btn");
const datosDiv = document.querySelector(".datos-obtenidos");


////////////////////////////////
btn.addEventListener("click", () => {
  fetch("/miapi")
    .then((response) => response.json())
    .then((data) => {
      // Crear tabla
      const tabla = document.createElement("table");
      tabla.border = "1";

      // Crear encabezado
      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Mensaje</th>
        </tr>
      `;
      tabla.appendChild(thead);

      // Crear cuerpo de la tabla
      const tbody = document.createElement("tbody");

      data.forEach((dato) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${dato.nombre}</td>
          <td>${dato.apellido}</td>
          <td>${dato.telefono}</td>
          <td>${dato.email}</td>
          <td>${dato.mensaje}</td>
        `;

        tbody.appendChild(fila);
      });

      tabla.appendChild(tbody);

      // Limpiar el contenedor antes de insertar la nueva tabla (opcional)
      datosDiv.innerHTML = "";
      datosDiv.appendChild(tabla);
    })
    .catch((error) => console.error("Error:", error));
});

 
