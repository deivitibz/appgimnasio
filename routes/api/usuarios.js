const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');


const usuarioModel = require('../../models/usuarioModel')



router.post('/',async (req,res)=>{
    //res.json(req.body);
    // TODO: validar los campos de entrada al registro

    req.body.password = bcrypt.hashSync(req.body.password,10)

    const respuesta = await usuarioModel.create(req.body);
    if(respuesta['affectedRows']===1){
        res.json({message: 'datos ok'});
    } else {
        res.json({message: 'errores' });
    }
});

// TODO: gestino del LOGIN

router.post('/login', async (req,res)=>{
    const usuario = await usuarioModel.getByEmail(req.body.email);
    if (usuario){
        const iguales = bcrypt.compareSync(req.body.password,usuario.password);
        if (iguales) {
            //createToken(usuario.id);
            res.json ({ message: 'login correcto', token: createToken(usuario.id)})
        } else {
            res.json({ message: 'error en email o password 2' })
        }
        
    } else {
        res.json({ message: 'error en email o password 1' })
    }
});

function createToken(userId){
    const payload = {
        userId: userId,
        createAt: moment().unix(),
        expiredAt: moment().add(15,'minutes').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
    
}

module.exports = router;
