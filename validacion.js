function validation() {
  var isValid = true;

  // Validación del nombre
  var nombre = document.getElementById("nombre").value.trim();
  if (nombre === "") {
    document.getElementById("nombreHelp").innerText =
      "El nombre es obligatorio";
    isValid = false;
  }

  // Validación de los apellidos
  var apellidos = document.getElementById("apellidos").value.trim();
  if (apellidos === "") {
    document.getElementById("apellidosHelp").innerText =
      "Los apellidos son obligatorios";
    isValid = false;
  }

  // Validación del email
  var email = document.getElementById("email").value.trim();
  if (email === "") {
    document.getElementById("emailHelp").innerText =
      "El correo electrónico es obligatorio";
    isValid = false;
  } else if (!isValidEmail(email)) {
    document.getElementById("emailHelp").innerText =
      "El correo electrónico debe tener un formato válido";
    isValid = false;
  }

  function isValidEmail(email) {
    var emailParts = email.split("@");
    if (emailParts.length !== 2) {
      return false; // Si no hay exactamente una "@" retornamos falso
    }
    
    var domain = emailParts[1];
    var domainParts = domain.split(".");
    if (domainParts.length < 2) {
      return false; // Si el dominio no tiene al menos un punto y un carácter después del punto, retornamos falso
    }
  
    return true;
  }
  
  
  
  // Validación de la provincia
  var provincia = document.getElementById("provincia").value;
  if (provincia === "0") {
    document.getElementById("provinciaHelp").innerText =
      "Debe seleccionar una provincia";
    isValid = false;
  }

  // Validación del sexo
  var sexo = document.querySelector('input[name="sexo"]:checked');
  if (!sexo) {
    document.getElementById("sexoHelp").innerText =
      "Debe seleccionar una opción";
    isValid = false;
  } else {
    document.getElementById("sexoHelp").innerText = ""; // Desaparece el mensaje de error si se selecciona un sexo
  }

  // Validación de la consulta
  var query = document.querySelector("#query").value.trim();
  if (query === "") {
    document.getElementById("queryHelp").innerText =
      "Debe escribir algo en su consulta";
    isValid = false;
  } else {
    document.getElementById("queryHelp").innerText = ""; // Desaparece el mensaje de error si se escribe en la consulta
  }

  // Validación de aceptación de términos
  var termsAccepted = document.getElementById("terminos").checked;
  if (!termsAccepted) {
    alert("Debe aceptar los términos y condiciones");
    isValid = false;
  }

  return isValid;
}

function deleteError(elementId) {
  document.getElementById(elementId + "Help").innerText = "";
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
