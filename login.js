document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessageLogin = document.getElementById("errorMessageLogin");
  const successMessageLogin = document.getElementById("successMessageLogin");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMessageLogin.textContent = "";
    successMessageLogin.textContent = "";

    const loginEmail = document
      .getElementById("emailAddressLogin")
      .value.trim();
    const password = document.getElementById("passwordLogin").value.trim();
    const remember = document.getElementById("rememberMe");

    if (!loginEmail || !password) {
      errorMessageLogin.textContent = "Please fill the required area";
      return;
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errorMessageLogin.textContent = "please use a vaild email address";
      return;
    } else {
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }
          successMessageLogin.textContent = data.message || "Login Successful";
          loginForm.reset();
        })
        .catch((err) => {
          errorMessageLogin.textContent = err.message || "Failed to Login";
        });
    }
  });
});
