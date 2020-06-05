var express = require('express');
var router = express.Router();

const moment = require('moment');


const Cliente = require('../models/cliente');

// recupera los clientes a una tabla
router.get('/', (req,res)=>{
    Cliente.getAll()
    .then(rows=>{
        res.render('clientes', { rows: rows})
    })
    .catch(err=>{

    })
    
});

router.get('/v2', async (req,res)=>{
    try{
        const rows = await Cliente.getAllV2();
        res.render('clientes', {rows: rows})
    }
    catch(err){
        res.send(err)
    }
}),

router.get('/new', (req,res)=>{
    res.render('clientes-nuevo');
});


router.get('/:idCliente', async (req,res)=>{
    try{
        const cliente = await Cliente.getById(req.params.idCliente);
        //console.log(moment(cliente.fecha_inscripcion).format('DD/MM/YYYY'));
        cliente.fecha_inscripcion = moment(cliente.fecha_inscripcion).format('DD/MM/YYYY')
        res.render('detalleCliente', { cliente: cliente })
    } catch (err) {
        res.send(err)
    }
});


router.get('/edit/:idCliente',async (req,res)=>{
    try {
        const cliente = await Cliente.getById(req.params.idCliente);
        res.render('clientes-editar', { cliente })
        console.log(cliente);
        
    } catch (err) {
        res.send(err)
    }
    //res.render('clientes-editar')
    //res.send('muestra el cliente con el id ' + req.params.idCliente)
})

router.get('/delete/:idCliente',(req,res)=>{
    Cliente.deleteById(req.params.idCliente)
    .then(resultado=>{
        console.log(resultado);
        res.redirect('/clientes')
        
    })
    .catch(err => res.send(err)
    )
})


router.post('/create', async (req,res)=>{
    console.log(req.body);
    const result = await Cliente.create(req.body);
    console.log(result);
    
    //res.json({message: 'cliente creado'});
    res.redirect('/clientes')
});    

router.post('/update', async (req,res)=>{
    const result = await Cliente.updateById(req.params.idCliente, req.body)
    console.log(req.body);
    
    //res.json(req.body)
    res.redirect('/clientes')
    //res.json(req.body)
})





module.exports = router;