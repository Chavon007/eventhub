document.addEventListener("DOMContentLoaded", () => {
  const errorAdmin = document.getElementById("adminErrorMessageLogin");
  const successAdmin = document.getElementById("adminSuccessMessageLogin");
  const adminForm = document.getElementById("adminLoginForm");

  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    successAdmin.textContent = "";
    errorAdmin.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    if (!username || !password) {
      errorAdmin.textContent = "Please fill the required area";
    } else {
      fetch("https://eventhubbackend-qa6q.onrender.com/api/admindashboard", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Incorrect Username or Password");
          }
          successAdmin.textContent = data.message || "Login Successfull";
          adminForm.reset();
          window.location.href = "../admin.html";
        })
        .catch((err) => {
          errorAdmin.textContent = err.message || "Failed to fetch data";
        });
    }
  });
});
