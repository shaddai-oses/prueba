import { createNotification } from "../components/notification.js";
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

//validaciones de regex
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const NAME_REGEX =  /^[A-Z\u00d1][a-zA-Z-ÿáéíóú\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿáéíóú\u00f1\u00d1\s]*)$/;

// valiudaciones 
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

//funcion para la validacion 
const validation = (input, regexValidation ) => {
    // este es un if else de la forma corta para hacer que funcione el boton y se quite la opcion del disabled
    formBtn.disabled = nameValidation && emailValidation && passwordValidation && matchValidation ? false : true;

    if (input.value ==='') {
        input.classList.add('focus:outline-none');
        input.classList.remove('outline-green-500', 'outline-2', 'outline');
        input.classList.remove('outline-red-500', 'outline-2', 'outline');
    }else if (regexValidation) {
        input.classList.remove('focus:outline-none');
        input.classList.add('outline-green-500', 'outline-2', 'outline');
        input.classList.remove('outline-red-500', 'outline-2', 'outline');
    } else if (!regexValidation){
        input.classList.remove('focus:outline-none');
        input.classList.remove('outline-green-500', 'outline-2', 'outline');
        input.classList.add('outline-red-500', 'outline-2', 'outline');
    }

};

//eventos 
nameInput.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(e.target.value);
    validation(nameInput, nameValidation);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validation(emailInput, emailValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    //se vuelve a colocar la parte del match validation y la funcion para que comparen la contrasena
    const matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation);
    validation(matchInput, matchValidation);
});

matchInput.addEventListener('input', e => {
    // en vez de usar regex se verifica con el valos del input de contrasena
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation);
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        }

        const {data} = await axios.post('/api/users', newUser);
        createNotification(false, data);
        setTimeout(() => {
            notification.innerHTML ='';
        }, 5000);

        // para borrar los datos del formulario
        nameInput.value = '';
        emailInput.value ='';
        passwordInput.value ='';
        matchInput.value ='';

        validation(nameInput, false);
        validation(emailInput, false);
        validation(passwordInput, false);
        validation(matchInput, false);


    } catch (error) {
        console.log(error);
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML ='';
        }, 5000);
    }
});