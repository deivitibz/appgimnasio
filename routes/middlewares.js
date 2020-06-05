const jwt = require('jsonwebtoken');
const moment = require('moment');

const Usuario = require('../models/usuarioModel')

const mainRedirect = (req,res,next)=>{
    if (req.url === '/'){
      res.redirect('/clientes')
    } else {
      next();
    }
  }

// comprueba si el token que recibimos en la cabecera User-Token cumple con los filtros
const checkToken = (req,res,next) => {
    // comprobar si el token viene en la cabecera
    if (!req.headers['user-token']){
        return res.json({error: 'debes incluir el token dentro de la cabecera User-Token'})
    }
    // comprobar token
    const userToken = req.headers['user-token'];
    let payload = {}
    try{
        payload = jwt.verify(userToken, process.env.SECRET_KEY);
    } catch (err) {
        return res.json({error: 'el token es incorrecto'})
    }

    // comprobar si el token esta caducado
    const fechaActual = moment().unix();
    if(fechaActual > payload.expiredAt){
        return res.json({error: 'el token incluido esta caducado'})
    } 

    // datos desencriptados del token dentro de la peticion
    req.payload = payload;
    

    next()
}

const isAdmin = async (req,res,next) =>{
    const usuario = await Usuario.getById(req.payload.userId);
    console.log(usuario);
    
    if (!usuario || usuario.role !== 'admin'){
        return res.json({error: 'acceso solo para admins'});
    }

    next()
}

module.exports = {
    mainRedirect, checkToken, isAdmin
}