const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
    // para recibir los datos al backend
    const { email, password } = request.body;
    // console.log(email, password);
    const userExist = await User.findOne({ email});
    // console.log(userExist);

    if (!userExist) {
        return response.status(400).json({error: 'Invalid email or password.'});
    }

    if (!userExist.verified) {
        return response.status(400).json({error: 'Your email has not been verified.'});
    }

    // para verificar si la contrasena es la correcta
    const isCorrect =  await bcrypt.compare(password, userExist.passwordHash)
    // console.log(isCorrect);

    if (!isCorrect) {
        return response.status(400).json({error: 'Invalid email or password.'});
    }

    // para guardar la informacion en las cookies es mas seguro y no pueden hacer nada con esa informacion
    // primero se accede al token 
    const userForToken = {
        id: userExist.id,
    }

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    // console.log(accessToken);

    // console.log(new Date(Date.now() + 1000 * 60 * 60 * 24 * 1));
    // para las cookies
    response.cookie('accessToken', accessToken, {
        // solo se pede acceder con la fecha real del momento en formato utc
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        // es para que la pagina sea segura
        secure: process.env.NODE_ENV === 'production',
        // que no pueda interactuar el cookie medianyte nada js o lo que sea 
        httpOnly: true
    });

    return response.sendStatus(200);
});

module.exports = loginRouter;