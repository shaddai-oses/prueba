const app = require('./app');
// para crear el rpopio servidor http
const http = require('http');
const { PAGE_URL } = require('./config');

// funcion de http donde va a vivir nuestra app
const server = http.createServer(app);

// evento que escuche todo lo que se hace con la app sea post get delete etc del frontend
server.listen(3005, () => {
    console.log(PAGE_URL);
    console.log('el servidor esta corriendo');
});

