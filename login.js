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
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(password)) {
      errorMessageLogin.textContent =
        "Password must contain at least one uppercase letter, one number, and one special character";
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
        .then((res) => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then((data) => {
          successMessageLogin.textContent = data.message || "Login Successful";
          loginForm.reset();
        })
        .catch((err) => {
          errorMessageLogin.textContent = err.message || "Failed to Login";
        });
    }
  });
});
