const form = document.getElementById("form-contacto");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    if (!validarNombre()) valid = false;
    if (!validarEmail()) valid = false;
    if (!validarAsunto()) valid = false;
    if (!validarMensaje()) valid = false;
    if (valid) mostrarExito();
});


function setError(campo, mensaje) {
    const input = document.getElementById(campo);
    const error = document.getElementById(campo + "-error");
    error.textContent = mensaje;
    error.classList.remove("hidden");
    input.classList.add("border-red-500");
    input.classList.remove("border-green-500");
}

function setOk(campo) {
    const input = document.getElementById(campo);
    const error = document.getElementById(campo + "-error");
    error.classList.add("hidden");
    input.classList.remove("border-red-500");
    input.classList.add("border-green-500");
}

function esEmailValido(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}


function validarNombre() {
    const v = document.getElementById("nombre").value.trim();
    if (v === "") {
        setError("nombre", "El nombre es obligatorio.");
        return false;
    }
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{3,}$/.test(v)) {
        setError("nombre", "Ingresa tu nombre (mínimo 3 caracteres, solo letras).");
        return false;
    }
    setOk("nombre");
    return true;
}

function validarEmail() {
    const v = document.getElementById("email").value.trim();
    if (v === "") {
        setError("email", "El correo es obligatorio.");
        return false;
    }
    if (!esEmailValido(v)) {
        setError("email", "El correo no es válido. Formato esperado: nombre@correo.com");
        return false;
    }
    setOk("email");
    return true;
}

function validarAsunto() {
    const v = document.getElementById("asunto").value.trim();
    if (v === "") {
        setError("asunto", "El asunto es obligatorio.");
        return false;
    }
    if (v.length < 5) {
        setError("asunto", "Indica el asunto de tu mensaje (mínimo 5 caracteres).");
        return false;
    }
    setOk("asunto");
    return true;
}

function validarMensaje() {
    const v = document.getElementById("mensaje").value.trim();
    if (v.length < 10 || v.length > 500) {
        setError("mensaje", "El mensaje debe tener entre 10 y 500 caracteres.");
        return false;
    }
    setOk("mensaje");
    return true;
}


const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
mensaje.addEventListener("input", function () {
    if (mensaje.value.length > 500) {
        mensaje.value = mensaje.value.slice(0, 500);
    }
    contador.textContent = mensaje.value.length + "/500";
});


function mostrarExito() {
    const correo = document.getElementById("email").value.trim();
    const exito = document.getElementById("exito");
    exito.textContent = "Mensaje enviado. Te responderemos a " + correo + " dentro de 24 h.";
    exito.classList.remove("hidden");
}


document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("asunto").addEventListener("blur", validarAsunto);
mensaje.addEventListener("blur", validarMensaje);
