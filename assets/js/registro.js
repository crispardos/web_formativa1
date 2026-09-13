const form = document.getElementById("form-registro");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    if (!validarNombre()) valid = false;
    if (!validarEmail()) valid = false;
    if (!validarTelefono()) valid = false;
    if (!validarPassword()) valid = false;
    if (!validarConfirmar()) valid = false;
    if (!validarNacimiento()) valid = false;
    if (!validarRegion()) valid = false;
    if (!validarComuna()) valid = false;
    if (!validarTerminos()) valid = false;
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

function esTelefonoValido(v) {
    return /^9\d{8}$/.test(v);
}

function tieneLetraYNumero(v) {
    return /[A-Za-z]/.test(v) && /\d/.test(v);
}


function validarNombre() {
    const v = document.getElementById("nombre").value.trim();
    if (v === "") {
        setError("nombre", "El nombre es obligatorio.");
        return false;
    }
    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñü\s]{3,}$/.test(v)) {
        setError("nombre", "Ingresa tu nombre completo (mínimo 3 caracteres, solo letras).");
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

function validarTelefono() {
    const v = document.getElementById("telefono").value.trim();
    if (v === "") {
        setError("telefono", "El teléfono es obligatorio.");
        return false;
    }
    if (!esTelefonoValido(v)) {
        setError("telefono", "Teléfono no válido. Debe tener 9 dígitos y empezar con 9. Ej: 912345678");
        return false;
    }
    setOk("telefono");
    return true;
}

function validarPassword() {
    const v = document.getElementById("password").value;
    if (v === "") {
        setError("password", "La contraseña es obligatoria.");
        return false;
    }
    if (v.length < 8 || !tieneLetraYNumero(v)) {
        setError("password", "La contraseña debe tener al menos 8 caracteres, una letra y un número.");
        return false;
    }
    setOk("password");
    return true;
}

function validarConfirmar() {
    const pass = document.getElementById("password").value;
    const v = document.getElementById("confirmar").value;
    if (v === "") {
        setError("confirmar", "Debes confirmar tu contraseña.");
        return false;
    }
    if (v !== pass) {
        setError("confirmar", "Las contraseñas no coinciden.");
        return false;
    }
    setOk("confirmar");
    return true;
}

function validarNacimiento() {
    const v = document.getElementById("nacimiento").value;
    if (v === "") {
        setError("nacimiento", "La fecha de nacimiento es obligatoria.");
        return false;
    }
    const nacimiento = new Date(v);
    const hoy = new Date();
    if (nacimiento > hoy) {
        setError("nacimiento", "La fecha no puede ser futura.");
        return false;
    }
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    if (edad < 18) {
        setError("nacimiento", "Debes ser mayor de 18 años para registrarte.");
        return false;
    }
    setOk("nacimiento");
    return true;
}

function validarRegion() {
    const v = document.getElementById("region").value;
    if (v === "") {
        setError("region", "Selecciona tu región.");
        return false;
    }
    setOk("region");
    return true;
}

function validarComuna() {
    const v = document.getElementById("comuna").value.trim();
    if (v === "") {
        setError("comuna", "Ingresa tu comuna.");
        return false;
    }
    setOk("comuna");
    return true;
}

function validarTerminos() {
    const check = document.getElementById("terminos");
    if (!check.checked) {
        setError("terminos", "Debes aceptar los términos y condiciones.");
        return false;
    }
    setOk("terminos");
    return true;
}


function mostrarExito() {
    const nombre = document.getElementById("nombre").value.trim().split(" ")[0];
    const exito = document.getElementById("exito");
    exito.textContent = "¡Registro exitoso, " + nombre + "! Redirigiendo al inicio de sesión...";
    exito.classList.remove("hidden");
    setTimeout(() => location.href = "login.html", 2000);
}


const btnVer = document.getElementById("btn-ver-pass");
btnVer.addEventListener("click", function () {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
    btnVer.textContent = pass.type === "password" ? "Mostrar" : "Ocultar";
});


document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("telefono").addEventListener("blur", validarTelefono);
document.getElementById("password").addEventListener("blur", validarPassword);
document.getElementById("confirmar").addEventListener("blur", validarConfirmar);
document.getElementById("nacimiento").addEventListener("blur", validarNacimiento);
document.getElementById("region").addEventListener("blur", validarRegion);
document.getElementById("comuna").addEventListener("blur", validarComuna);
