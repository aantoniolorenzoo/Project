const form = document.querySelector("form");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const email = document.getElementById("email");
const provincia = document.getElementById("provincia");
const genderInputs = document.querySelectorAll('input[name="sexo"]');
const genderHelp = document.getElementById("sexoHelp");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const nombreValue = nombre.value.trim();
  const apellidosValue = apellidos.value.trim();
  const emailValue = email.value.trim();
  const provinciaValue = provincia.value.trim();
  let isValid = true;
  const lettersRegex = /^[a-zA-Z\s]+$/;

  if (nombreValue === "") {
    document.getElementById("nombreHelp").innerText =
      "El nombre es obligatorio";
    isValid = false;
  } else {
    document.getElementById("nombreHelp").innerText = "";
  }

  if (apellidosValue === "") {
    document.getElementById("apellidosHelp").innerText =
      "Los apellidos son obligatorios";
    isValid = false;
  } else {
    document.getElementById("apellidosHelp").innerText = "";
  }

  if (emailValue === "") {
    document.getElementById("emailHelp").innerText =
      "El correo electrónico es obligatorio";
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    document.getElementById("emailHelp").innerText =
      "El correo electrónico debe tener un formato válido";
    isValid = false;
  } else {
    document.getElementById("emailHelp").innerText = "";
  }

  if (provinciaValue === "0") {
    document.getElementById("provinciaHelp").innerText =
      "Debe seleccionar una provincia";
    isValid = false;
  } else {
    document.getElementById("provinciaHelp").innerText = "";
  }

  

  if (isValid) {
    form.submit();
  }
}

function isValidEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function deleteError(elementId) {
  document.getElementById(elementId + "Help").innerText = "";
}
