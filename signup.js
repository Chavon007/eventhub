document.addEventListener("DOMContentLoaded", () => {
  // signUp validation
  const signUpForm = document.getElementById("signup");
  const successMessageSignUp = document.getElementById("successMessageSignUp");
  const errorMessageSignUp = document.getElementById("errorMessageSignUp");
  const submitbtn = document.getElementById("btn1");
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    successMessageSignUp.textContent = "";
    errorMessageSignUp.textContent = "";

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value.trim();
    const agreed = document.getElementById("agree");
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      errorMessageSignUp.textContent = "Please fill the required area";
      return;
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      errorMessageSignUp.textContent = "please use a vaild email address";
      return;
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/.test(password)) {
      errorMessageSignUp.textContent =
        "Password must contain at least one uppercase letter, one number, and one special character.";
      return;
    } else if (confirmPassword !== password) {
      errorMessageSignUp.textContent =
        "Confirm Password does not match with passsword";
      return;
    } else if (!agreed.checked) {
      errorMessageSignUp.textContent =
        "You must agree to the Terms and Privacy Policy before creating an account";
      return;
    } else {
      submitbtn.disabled = true;

      fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          firstName,
          lastName,
          phoneNumber,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to create account");
          return res.json();
        })
        .then((data) => {
          successMessageSignUp.textContent =
            data.message || "Account created successfully";
          signUpForm.reset();
        })
        .catch((err) => {
          errorMessageSignUp.textContent =
            err.message || "Can't create Account";
        })
        .finally(() => {
          submitbtn.disabled = false;
        });
    }
  });
});
