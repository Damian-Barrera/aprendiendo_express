const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que la página se recargue

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.text(); // por ahora el servidor devuelve texto
  if (result === "Login correcto") {
    // Redirige dinámicamente al dashboard
    window.location.href = "/dashboard";
  } else {
    alert(result);
  }
});
