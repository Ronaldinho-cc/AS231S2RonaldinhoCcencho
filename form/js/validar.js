function validarFormulario() {
    // Obtener los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const nacimiento = document.getElementById('nacimiento').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const aceptarCondiciones = document.getElementById('aceptar-condiciones');

    // Validar campos

    // Ejemplo de validación de contraseña (al menos 6 caracteres, letras y números)
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regexPassword.test(password)) {
        alert('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.');
        return false;
    }

    // Ejemplo de validación de fecha (formato dd/mm/aaaa)
    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexFecha.test(nacimiento)) {
        alert('Ingrese una fecha válida en formato dd/mm/aaaa.');
        return false;
    }

    // Habilitar botón de envío si se aceptan las condiciones
    if (aceptarCondiciones.checked) {
        return true;
    } else {
        alert('Debe aceptar las condiciones para registrarse.');
        return false;
    }
}

function mostrarContrasena() {
    const password = document.getElementById('password');
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}
