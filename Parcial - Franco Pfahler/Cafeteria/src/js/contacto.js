const form = document.getElementById("formContacto");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorMensaje = document.getElementById("errorMensaje");

function validarNombre() {
  if (nombre.value.trim() === "") {
    errorNombre.textContent = "El nombre es obligatorio.";
    return false;
  } else {
    errorNombre.textContent = "";
    return true;
  }
}

function validarEmail() {
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (email.value.trim() === "") {
    errorEmail.textContent = "El email es obligatorio.";
    return false;
  } else if (!regex.test(email.value)) {
    errorEmail.textContent = "El email no es válido.";
    return false;
  } else {
    errorEmail.textContent = "";
    return true;
  }
}

function validarMensaje() {
  if (mensaje.value.trim() === "") {
    errorMensaje.textContent = "El mensaje no puede estar vacío.";
    return false;
  } else {
    errorMensaje.textContent = "";
    return true;
  }
}

nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
mensaje.addEventListener("input", validarMensaje);

form.addEventListener("submit", function (e) {
  const valido = validarNombre() && validarEmail() && validarMensaje();

  if (!valido) {
    e.preventDefault();
  } else {
    alert("¡Formulario enviado correctamente!");
  }
});