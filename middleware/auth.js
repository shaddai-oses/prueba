// para verificar y autorizar que el usuario haya iniciado sesion
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// next para pasar a la siguiente funcion en la app
const userExtractor = async (request, response, next) => {
    try {
          // comprobar que el token se encuentre en el navegador
    const token = request.cookies?.accessToken;
    if(!token){
        return response.sendStatus(401);
    }

    // en caso de que alguien cree otro token no de error pero que tampoco lo deje hacer algo
    // const badToken = jwt.sign('knscskjdn', 'hola')

    // comprobar que el token este firmado por el servidor
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    // console.log(decoded);
    // console.log(user);
    request.user = user;
    } catch (error) {
        return response.sendStatus(403);
    }
    next();
};

module.exports = { userExtractor };