// donde va a vivir la app
// al usar require se extraen módulos
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// para poder entrar en los archivos sin importar que sea linux o window
const path = require('path');
const usersRouter = require('./controllers/users');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const {PAGE_URL, MONGO_URI}= require('./config');
const loginRouter = require('./controllers/login');
const contactsRouter = require('./controllers/contacts');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');


// para conectar con la base de datos de Mongoose
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectando a MongoDB');
  } catch (error) {
    console.log('No se pudo conectar a MongoDB');
    console.log(error);
  }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/contactify', express.static(path.resolve('views', 'contactify')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

// rutas backend
app.use('/api/users/', usersRouter );
app.use('/api/login/', loginRouter);
app.use('/api/logout/', logoutRouter);
app.use('/api/contact/',userExtractor ,contactsRouter);
// userExtractor,

// para iniciar el servidor esto se debe exportar para usarlo en otros archivos con el require
module.exports = app;
