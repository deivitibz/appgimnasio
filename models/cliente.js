const queries = require('../queries');


const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getAllV2 = () => {
    return new Promise((resolve, reject) => {
        db.query(queries.selectAll, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

const create = ({ nombre, apellidos, direccion, email, edad, sexo, dni }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into clientes (nombre,apellidos,direccion,email,edad,sexo,cuota,fecha_nacimiento,dni,fecha_inscripcion) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
            [nombre, apellidos, direccion, email, edad, sexo, 19.99, new Date(), dni, new Date()],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};

const getById = (idCliente) => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes where id = ?', [idCliente], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('el id no existe');
            resolve(rows[0]);
        })
    })
}

const deleteById = (idCliente) => {
    return new Promise((resolve, reject) => {
        db.query('delete from clientes where id = ?', [idCliente], (err, resultado) => {
            if (err) reject(err);
            resolve(resultado);
        });
    });
};

const updateById = (idCliente, {nombre,apellidos,direccion,email,edad,dni}) => {
    return new Promise ((resolve,reject)=>{
        db.query(
        'update clientes set nombre = ?, apellidos = ?, direccion = ?,email = ?, edad = ?, dni = ? where id = ?', 
        [nombre,apellidos,direccion,email,edad,dni,idCliente],
        (err,resultado)=> {
            console.log(resultado);
            
            if (err) reject (err)
            resolve(resultado)
        })
    })
}

/* deleteById(9,(err,result)=>{
    console.log(result);
    
})
 */
/* 
const deleteByIdCb = (pClientId, callback) => {

    db.query('delete from clientes where id = ?', [pClientId], callback);
}

deleteByIdCb(9, (err, result) => {

    console.log(result);
});
const executeQuery = (query, values) => {

} */


module.exports = {
    getAll,
    getAllV2,
    create,
    getById,
    deleteById,
    updateById
}