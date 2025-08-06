document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/me", {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: User not logged in`);
      return res.json();
    })
    .then((data) => {
      const user = data.user;
      if (!user) {
        throw new Error("No user data received");
      }
      const welcomeElement = document.getElementById("welcomeMessage");
      if (welcomeElement) {
        const firstName = user.firstName || "User";
        const lastName = user.lastName || "";
        welcomeElement.textContent = `Welcome Back ${firstName} ${lastName}`;
      }
    })
    .catch((err) => {
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    });

  // logout

  const logout = document.getElementById("logout");

  logout.addEventListener("click", () => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "../index.html";
      })
      .catch((err) => {});
  });
});
