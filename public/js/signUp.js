document.getElementById('signUp').addEventListener('click', (event) => {
    checkEmail();
    checkPassword();
    confirmPassword();
})

let checkEmail = () => {
    const email = document.getElementById('email').value
    const validarEmail = /^[a-z0-9]+@[a-z]+.[a-z]{2,4}$/

    if (email.match(validarEmail)) {
        console.log('true')
    } else {
        alert("Email invalido")
    }
}

let checkPassword = () => {
    const password = document.getElementById('password').value
    const validarPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/
    
    if (password.match(validarPassword)) {
        console.log('true')
    } else {
        alert("Contraseña invalida")
    }
}

let confirmPassword = () => {
    const password = document.getElementById('passwordConfirm').value
    const confirmarPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/
    
    if (password.match(confirmarPassword)) {
        console.log('true')
    } else {
        alert("Contraseña invalida")
    }
}