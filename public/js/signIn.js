document.getElementById('singIn').addEventListener('click', (event) => {
    checkEmail();
    checkPassword();
})

let checkEmail = () => {
    const email = document.getElementById('mail').value
    const validarEmail = /^[a-z0-9]+@[a-z]+.[a-z]{2,4}$/

    if (email.match(validarEmail)) {
        console.log('true')
    } else {
        console.log('false')
    }
}

let checkPassword = () => {
    const password = document.getElementById('psswrd').value
    const validarPassword = /^[\w]{1}[\w\W?]{5,19}/
    
    if (password.match(validarPassword)) {
        console.log('true')
    } else {
        console.log('false')
    }
}