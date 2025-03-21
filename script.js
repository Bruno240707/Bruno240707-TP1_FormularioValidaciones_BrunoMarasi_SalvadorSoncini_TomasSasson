let vuelta = true

mostrarYOcultarRegistros = () => {
    let listaRegistros = JSON.parse(localStorage.getItem("list"))

    if(!Array.isArray(listaRegistros)) {
        listaRegistros = []
    }

    if(vuelta == true) {
        listaRegistros.forEach(usuario => {
            let usuariosRegistrados = document.getElementById("usuariosRegistrados")
            let div = document.createElement("div")
            div.innerHTML = "Nombre: " + usuario.nombre + " " + "Email: " + usuario.email
            usuariosRegistrados.appendChild(div)
        })
    }
    else {
        usuariosRegistrados.innerHTML = ""
    }
    vuelta = !vuelta
}

const completarYValidarFormulario = () => {

    let nombre = document.getElementById("nombreCompleto")    
    let email = document.getElementById("email")
    let contra = document.getElementById("contra")
    let repetirContra = document.getElementById("repetirContra")
    let botonRegistro = document.getElementById("enviarRegistro")

    const cantidadMinimaCaracteresNombre = 3
    const largoContra = 8

    const nombreEsValido = nombre.value.length >= cantidadMinimaCaracteresNombre
    const tieneNumeros = /[1234567890]/.test(contra.value)
    const tieneMayuscula = /[A-Z]/.test(contra.value);  
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contra.value);
    const tieneOchoLetras = contra.value.length > largoContra
    const expresionEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const validarEmail = expresionEmail.test(email.value) 

    let todoValido = false

    mensajeErrorEsValida = document.getElementById("mensajeErrorEsValida")
    mensajeErrorEmail = document.getElementById("mensajeErrorEmail")
    mensajeErrorNombre = document.getElementById("mensajeErrorNombre")
    mensajeErrorSonIguales = document.getElementById("mensajeErrorSonIguales")
    mensajeRegistroExitoso = document.getElementById("mensajeRegistroExitoso")

    //VALIDACION CONTRA CUMPLE REQUISITOS
    let contraEsValida = tieneNumeros && tieneMayuscula && tieneEspecial && tieneOchoLetras

    if(contra.value.length != 0) 
    {
        mensajeErrorEsValida.classList.remove("mensaje-error", "mensaje-exito")

        if(contraEsValida)
        {
            mensajeErrorEsValida.classList.add("mensaje-exito")
            mensajeErrorEsValida.innerHTML = "Es valido"
        }
        else 
        {
            mensajeErrorEsValida.classList.add("mensaje-error")
            mensajeErrorEsValida.innerHTML = "La contra debe tener Mayuscula, 1 numero, 8 caracteres de los cuales uno debe ser caracter especial"
        }
    }
    else 
    {
        mensajeErrorEsValida.innerHTML = ""
    }


    //VALIDACION CORREO ELECTRONICO
    if(email.value.length != 0)
    {
        mensajeErrorEmail.classList.remove("mensaje-error", "mensaje-exito")

        if(validarEmail) 
        {
            mensajeErrorEmail.classList.add("mensaje-exito")
            mensajeErrorEmail.innerHTML = "Es valido"
        }
        else 
        {
            mensajeErrorEmail.classList.add("mensaje-error")
            mensajeErrorEmail.innerHTML = "Ingrese un email valido"
        }
    }
    else 
    {
        mensajeErrorEmail.innerHTML = ""
    }

    //VALIDACION NOMBRE
    if(nombre.value.length != 0)
    {
        mensajeErrorNombre.classList.remove("mensaje-error", "mensaje-exito")

        if(nombreEsValido) 
        {
            mensajeErrorNombre.classList.add("mostrar", "mensaje-exito")
            mensajeErrorNombre.innerHTML = "Es valido"
        }
        else 
        {
            mensajeErrorNombre.classList.add("mostrar", "mensaje-error")
            mensajeErrorNombre.innerHTML = "El nombre debe tener minimo 3 caracteres"
        }
    }
    else 
    {
        mensajeErrorNombre.innerHTML = ""  
    }

    //VALIDACION REPETIR CONTRA
    let contrasIguales = contra.value == repetirContra.value

    if(repetirContra.value.length != 0) 
    {
        mensajeErrorSonIguales.classList.remove("mensaje-error", "mensaje-exito")

        if(contrasIguales) 
        {
            mensajeErrorSonIguales.classList.add("mensaje-exito")
            mensajeErrorSonIguales.innerHTML = "Es valido" 
        }
        else 
        {
            mensajeErrorSonIguales.classList.add("mensaje-error")
            mensajeErrorSonIguales.innerHTML = "Las contraseñas no son coincidientes" 
        }
    }
    else
    {
        mensajeErrorSonIguales.innerHTML = "" 
    }

    //ENVIAR FORMULARIO CUANDO
    if(contraEsValida && nombreEsValido && contrasIguales && validarEmail) 
    {
        todoValido = true
    }
    else
    {
        todoValido = false
    }

    botonRegistro.onclick = () => {
        if (todoValido) {
            alert("REGISTRO EXITOSO!")
            
            let usuarioRegistrado = {
                nombre: nombre.value,
                email: email.value,
                contra: contra.value
            }
            
            listaRegistros = JSON.parse(localStorage.getItem("list"))

            if(!Array.isArray(listaRegistros)) {
                listaRegistros = []
            }
            
            listaRegistros.push(usuarioRegistrado)
            
            localStorage.setItem("list", JSON.stringify(listaRegistros))
        }
    }

    return todoValido
}

const cambiarModoFondo = () => {
    let body = document.getElementById("body")
    let cajaFormulario = document.getElementById("cajaForm")

    body.classList.toggle("fondoNegro")
    body.classList.toggle("fondoBlanco")

    cajaFormulario.classList.toggle("cajaFormularioModo1")
    cajaFormulario.classList.toggle("cajaFormularioModo2")

}

const mostrarContra = () => {
    let contra = document.getElementById("contra")

    if(contra.type === "password") {
        contra.type = "text"
    } else {
        contra.type = "password"
    }
}

const borrarUsuariosRegistrados = () => {
    localStorage.clear()
    location.reload()
}



