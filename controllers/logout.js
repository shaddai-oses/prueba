const logoutRouter = require('express').Router();

// get
logoutRouter.get('/', async (request, response) =>{
    const cookies = request.cookies;

    if(!cookies?.accessToken) {
        return response.sendStatus(401);
    }

    const accessToken = cookies.accessToken;

    response.clearCookie('accessToken', {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    return response.sendStatus(204);
});

module.exports =  logoutRouter;
