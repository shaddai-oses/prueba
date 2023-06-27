// para conectar a mongo desde la dependencia moongose
const mongoose = require('mongoose');

// conectar los todos con el usuario y el usuario con los todos
const contactSchema = new mongoose.Schema({
    name: String,
    number: Number,
    // para conectar las tablas en moongose que tenga referenciaas en los dos archivos, y esto se usa para que sin importar que el usuario actualice su informacion siempre va tener el mismo id, y esta informacion se coloca tambien en la parte del usuario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// para recibir el id de la forma que uno conoce y lo mismo con la informacion que este encriptada como la password _v es para la version
// configurar la respuesta del usuario
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// para usarlo en otros archivos
const contact= mongoose.model('contact', contactSchema);

module.exports = contact;