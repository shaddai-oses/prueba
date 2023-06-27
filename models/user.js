// para conectar a mongo desde la dependencia moongose
const mongoose = require('mongoose');

// esto es para guardar la informacion como una tabla de sql y se le especifica que es con las primitivas de js
// para verificar el usuario desde el correo se usa verified
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  verified: {
    type: Boolean,
    default: false
  },
  contact: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact'
  }]
});

// para recibir el id de la forma que uno conoce y lo mismo con la informacion que este encriptada como la password _v es para la version
// configurar la respuesta del usuario
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

// para usarlo en otros archivos
const User = mongoose.model('User', userSchema);

module.exports = User;