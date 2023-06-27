// seleccionar las variables con queryselector
const nameInput = document.querySelector('#name-input')
const numberInput = document.querySelector('#number-input');
const list = document.querySelector('#container-list');
const submit = document.querySelector('#btn-agg');
const deleteButton= document.querySelector('.delete-button');
const checkButton= document.querySelector('.check-button');
const form = document.querySelector('#formulario');
// // para el boton de cerrar sesion
const closeBtn = document.querySelector('#btn-close');

// Regex validacion
const NUMBER_REGEX = /^(\+58)?(0)?(4)(12|14|16|24|26)\d{7,10}$/;
const NAME_REGEX = /^[a-zA-Z]{3,10}$/

// funcion de colores en el input y el helper text
const validation = (input, regexValidation) => {
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

nameInput.addEventListener('input', e => {
    const nameValidation = NAME_REGEX.test(e.target.value);
    validation(nameInput, nameValidation);
});

numberInput.addEventListener('input', e => {
    const numberValidation = NUMBER_REGEX.test(e.target.value);
    validation(numberInput, numberValidation);
});


form.addEventListener('submit', async e  => {
    e.preventDefault();

    if (NUMBER_REGEX.test(numberInput.value)&&NAME_REGEX.test(nameInput.value)) {

    const { data } = await axios.post('/api/contact', { name: nameInput.value, number: numberInput.value});
    // console.log(data);    

    const listItem = document.createElement('li');
    listItem.id = data.id
    listItem.innerHTML = `
    <div class='add flex flex-row items-center justify-center gap-1 bg-violet-50 w-[16rem] p-1 rounded-full w '>
    <button class='delete-button bg-violet-800 p-1 rounded-full'>
    <svg class='delete-btn-icon w-[1.3rem] h-[1.3rem] text-violet-50 pointer-events-none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path class='pointer-events-none' stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </button>
    <input class='name-add flex flex-col items-center justify-center text-[#1e293b] font-semibold text-sm w-20 p-0 outline-none bg-violet-50' type='text' value=${data.name} readonly >
    <input class='number-add flex flex-col items-center justify-center text-[#1e293b] font-semibold text-sm w-24 p-0 outline-none bg-violet-50' type='text' value=${data.number} readonly>
    <button class='check-button bg-violet-800 p-1 rounded-full'>
    <svg class='check-btn-icon w-[1.3rem] h-[1.3rem] text-violet-50 pointer-events-none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path class='pointer-events-none' stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
    </button>
    </div>
    `;
    list.append(listItem);
    nameInput.value = '';
    numberInput.value ='';
    }
});

// // eventos para los botones de borrar y editar
list.addEventListener('click', async e => {
    e.preventDefault( );

    if (e.target.classList.contains('delete-button')) {
        const li = e.target.parentElement.parentElement;
        await axios.delete(`/api/contact/${li.id}`)
        li.remove( );
    };

    if (e.target.classList.contains('check-button')) {

            const nameInput = e.target.parentElement.children[1];
            const numberInput = e.target.parentElement.children[2];
            const li = e.target.parentElement.parentElement;

            console.log(li.id);
            // Verificar que el valor del input de número de teléfono cumpla con el regex
            if (!NUMBER_REGEX.test(numberInput.value)) {
                alert('Número de teléfono inválido');
                return;
            }

            // Verificar que el valor del input de nombre cumpla con el regex
            if (!NAME_REGEX.test(nameInput.value)) {
                alert('Nombre inválido');
                return;
            }

            if (nameInput.hasAttribute('readonly')) {
                nameInput.removeAttribute('readonly');
                numberInput.removeAttribute('readonly');
            } else {
                nameInput.setAttribute('value', nameInput.value);
                numberInput.setAttribute('value', numberInput.value);
                nameInput.setAttribute('readonly', true);
                numberInput.setAttribute('readonly', true);
                console.log(nameInput.value);
                console.log(numberInput.value);
                await axios.patch(`/api/contact/${li.getAttribute('id')}`, { name: nameInput.value, number: numberInput.value });
            }
        }

});

// para que cargue la informacion de la base de datos se hace una funcion asincrona para que cargue apenas cargue la pagina
(async ( ) => {
    try {
        const { data } = await  axios.get('/api/contact');
        // console.log(data);
        data.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.id = contact.id
            listItem.innerHTML = `
            <div class='add flex flex-row items-center justify-center gap-1 bg-violet-50 w-[16rem] p-1 rounded-full w '>
            <button class='delete-button bg-violet-800 p-1 rounded-full'>
            <svg class='delete-btn-icon w-[1.3rem] h-[1.3rem] text-violet-50 pointer-events-none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path class='pointer-events-none' stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>
            <input class='name-add flex flex-col items-center justify-center text-[#1e293b] font-semibold text-sm w-20 p-0 outline-none bg-violet-50' type='text' value=${contact.name} readonly >
            <input class='number-add flex flex-col items-center justify-center text-[#1e293b] font-semibold text-sm w-24 p-0 outline-none bg-violet-50' type='text' value=${contact.number} readonly>
            <button class='check-button bg-violet-800 p-1 rounded-full'>
            <svg class='check-btn-icon w-[1.3rem] h-[1.3rem] text-violet-50 pointer-events-none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path class='pointer-events-none' stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            </button>
            </div>
            `;
        list.append(listItem);
        });
    } catch (error) {
        console.log(error);
    }
})();

// para el boton de cerrar sesion
closeBtn.addEventListener('click', async e => {
   try {
    await axios.get('/api/logout');
    window.location.pathname = '/login'
    window.history.replaceState({}, '', '/login');
   } catch (error) {
    console.log(error);
   }
});