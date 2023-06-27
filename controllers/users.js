// // crear un router para guardar todos los get, post delete ect
const usersRouter = require('express').Router( );
const User = require('../models/user');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {PAGE_URL}= require('../config');

// // para que del frontend se guarden la informacion en el backend 
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    console.log(name, email, password);

  if (!name ||  !email || !password) {
    return response.status(400).json({error: 'All fields are required.' });
  }

  // para verificar el correo
  const userExist = await User.findOne({ email });
  if (userExist) {
    return response.status(400).json({error: 'The email is already in use.'})
  }

  // para encriptar la contrasena 
  // saltrounds para el nivel de encriptado es la perfecta y preferida por desarrolladores, rapida y segura
  const saltRounds =10;
  const passwordHash =  await bcrypt.hash(password, saltRounds);
  console.log(passwordHash);

  const newUser = new User({
  name,
  email,
  passwordHash,
  });

// para guardar al nuevo usuario
  const savedUser = await newUser.save();

 // para enviar correo para verificar al usuario
  const token = jwt.sign({id: savedUser.id}, process.env.ACCESS_TOKEN_SECRET, {
    // por mayor seguridad se coloca el token para que tenga un tiempo limite al solicitarlo, la mayoria son de 1h
    expiresIn: '1d'
  });

// permiso especial para que al verificar no tenga que poner siempre la contrasena en gmail app passwords

  // luego instalar nodemailer y copiar este codigo
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  await transporter.sendMail({
  from: process.env.EMAIL_USER , // sender address
  to: savedUser.email, // list of receivers
  subject: "User verification.", // Subject line
  html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verify email.</a>`, // html body
});

// 201 es creado
return response.status(201).json('User created. Please verify your email.');
});

usersRouter.patch('/:id/:token', async (request, response) => {
  try {
    const token = request.params.token;
    // para verificar el token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    // para cambiar el verified a true para actualizar el estado del usuario
    await User.findByIdAndUpdate(id, {verified: true});
    return response.sendStatus(200)
    console.log(decodedToken);
  } catch (error) {
    // Econtrar el email del usuario
    const id =request.params.id;
    const { email } = await User.findById(id);
    // console.log(email);
    // para firmar el nuevo token
    const token = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    // enviar el email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER , // sender address
      to: email, // list of receivers
      subject: "User verification.", // Subject line
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verify email.</a>`, // html body
    });
    return response.status(400).json({error: 'The link has expired. A new verification link has been sent to your email.'});
    console.log(error);
  }
});

// // para exportar de una vez el router
module.exports = usersRouter;