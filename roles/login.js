const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que se recargue la página

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // guardamos token en localStorage
      localStorage.setItem("token", data.token);
      
      // login correcto → redirigimos
      window.location.href = "dashboard.html";
    } else {
      alert(data.error || "Credenciales incorrectas");
    }
  } catch (err) {
    console.error("Error en login:", err);
  }
});
