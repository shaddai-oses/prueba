const contactsRouter = require('express').Router();
const User = require('../models/user');
const Contact = require('../models/contact');

// get
contactsRouter.get('/', async (request, response) =>{
    const user = request.user;
    const contact = await Contact.find({ user: user.id });
    return response.status(200).json(contact);
});

// para agregar contactos
contactsRouter.post('/', async (request, response) =>{
    const user = request.user;
    // lo que esta enviando el frontend
    const { name, number } =  request.body;
    // console.log(name, number);

    const newContact = new  Contact({
        name,
        number,
        user: user._id
    });
    // luego se guarda el todo
    const savedContact = await newContact.save();

    // cada tarea se va agregando al usuario
    user.contact = user.contact.concat(savedContact._id);
    await user.save();

    // // y por ultimo se devuelve el resultado exitoso
    return response.status(201).json(savedContact);
});

// para borrar los contactos
contactsRouter.delete('/:id', async (request, response) =>{
    const user = request.user;

    await  Contact.findByIdAndDelete(request.params.id);

    user.contact = user.contact.filter(id => id.toString() !== request.params.id);

    await user.save();
    // y por ultimo se devuelve el resultado exitoso
    return response.sendStatus(204);
});

// para editar los contactos
contactsRouter.patch('/:id', async (request, response) =>{
    const user = request.user;

    const {name, number} = request.body;

    await Contact.findByIdAndUpdate(request.params.id, {name: name, number: number});
    // y por ultimo se devuelve el resultado exitoso
    return response.sendStatus(200);
});


module.exports =  contactsRouter;