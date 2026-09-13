
const form = document.getElementById("form-login");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // SIEMPRE bloquear envío (IE1.2.1)
    let valid = true;
    if (!validarEmail()) valid = false;
    if (!validarPassword()) valid = false;
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


function validarEmail() {
    const v = document.getElementById("email").value.trim();
    if (v === "") {
        setError("email", "El correo es obligatorio.");
        return false;
    }
    if (!esEmailValido(v)) {
        setError("email", "Ingresa un correo válido para continuar.");
        return false;
    }
    setOk("email");
    return true;
}

function validarPassword() {
    const v = document.getElementById("password").value;
    if (v === "") {
        setError("password", "La contraseña es obligatoria.");
        return false;
    }
    if (v.length < 8) {
        setError("password", "La contraseña debe tener al menos 8 caracteres.");
        return false;
    }
    setOk("password");
    return true;
}


function mostrarExito() {
    const exito = document.getElementById("exito");
    exito.classList.remove("hidden");
    setTimeout(() => location.href = "../index.html", 2000);
}


const btnVer = document.getElementById("btn-ver-pass");
btnVer.addEventListener("click", function () {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
    btnVer.textContent = pass.type === "password" ? "Mostrar" : "Ocultar";
});

document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("password").addEventListener("blur", validarPassword);
