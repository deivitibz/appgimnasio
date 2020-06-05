const router = require('express').Router();

const apiClientesRouter = require('./api/clientes');
//const apiProfesoresRouter = require('./api/profesores');
const apiUsuariosRouter = require('./api/usuarios')

router.use ('/clientes', apiClientesRouter)
router.use ('/usuarios', apiUsuariosRouter)
//router.use ('/profesores', apiProfesoresRouter)


module.exports = router;
