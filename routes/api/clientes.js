const router = require('express').Router();
const Cliente = require('../../models/cliente')

// GET http://localhost:3000/api/cliente
/* router.get('/',async (req,res)=>{
    const clientes = await Cliente.getAll()
    res.json(clientes)
}) */

router.get('/',(req,res)=>{
    Cliente.getAll()
    .then(clientes => res.json(clientes))
    .catch(err => res.json({error: err.message}))
})

// POST http://localhost:3000/api/clientes
// Crea un nuevo cliente en la BBDD

router.post('/',async (req,res)=>{
    const result = await Cliente.create(req.body)
    if (result['affectedRows'] === 1){
        const cliente = await Cliente.getById(result['insertId'])
        res.json({message: 'cliente insertado', cliente: cliente.idCliente})
    } else {
        res.json({message: 'cliente no insertado'})
    }
})

// DELETE http://localhost:3000/api/clientes/:id
// Elimina un cliente

router.delete('/:idCliente', async (req,res)=>{
    const resultado = await Cliente.deleteById(req.params.idCliente);
    console.log(resultado);
    
    if(resultado['affectedRows']===1){
        res.json({ message: ' cliente eliminado' })
    } else {
        res.json({ error: 'no se a borrado'})
    }

});

router.delete('/cuota/:cuotaMin',(req,res)=>{

})

// PUT http://localhost:3000/api/clientes/:idCliente
// Actualizar datos de cliente

router.put('/:idCliente', async (req,res)=>{
    const resultado = await Cliente.updateById(req.params.idCliente,req.body);
    if(resultado['affectedRows']===1){
        res.json({message: 'actualizado'})
    } else {
        res.json ({message: 'te falta algun dato campeon'})
    }

})
 
module.exports = router;