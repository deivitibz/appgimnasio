const create = ({username,email,password}) => {
    return new Promise ((resolve, reject)=>{
        db.query('insert into usuarios (username,email,password) values (?,?,?)',
        [username,email,password],
            (err,resultado)=>{
                if(err) reject(err);
                resolve(resultado);
            })
    });
};

const getByEmail = (email) => {
    return new Promise ((resolve,reject)=>{
        db.query('select * from usuarios where email = ?',[email],(err,rows)=>{
            if (err) reject (err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0])
        });
    });
};

const getById = (usuarioId) =>{
    return new Promise ((resolve,reject)=>{
        db.query('select * from usuarios where id = ?',[usuarioId],(err,rows)=>{
            if (err) reject (err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0])
        })
    })
}

module.exports = {
    create,
    getByEmail,
    getById
}