    import {pool} from '../../models/MySql.js'

//SECTION - OBTENER USUARIOS
export const getUsuarios = (req, res) => {
    //NOTE - Esto es tal cosa
    let sql ="SELECT * FROM usuarios "
    
    pool.query(sql, (error, data) => {
      if(!error){
        res.status(200).send(data)
      }else{
        res.status(500).send({
            titulo:error.code,
            mensaje:error.message
        })
      }
    });
  }
//!SECTION

export const getUsuariosNombre = (req, res) => {
    //NOTE - Esto es tal cosa
    let sql ="SELECT * FROM usuarios WHERE Nombre Like ?;"
    let nombre = req.params.nombre + '%';
    pool.query(sql, nombre, (error, data) => {
      if(!error){
        res.status(200).send(data)
      }else{
        res.status(500).send({
            titulo:error.code,
            mensaje:error.message
        })
      }
    });
  }

  export const getUsuariosRol = (req, res) => {
    //NOTE - Esto es tal cosa
    let sql ="SELECT * FROM usuarios WHERE Rol Like ?;"
    let nombre = req.params.rol;
    pool.query(sql, nombre, (error, data) => {
      if(!error){
        res.status(200).send(data)
      }else{
        res.status(500).send({
            titulo:error.code,
            mensaje:error.message
        })
      }
    });
  }

  export const postUsuarios =  (req, res) => {
    console.log(req.body.nombre);
    let frmData={
        nombre:req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        contrasena: req.body.contrasena,
        
    }
    pool.query("INSERT INTO usuarios set ?",frmData,(error,data)=>{
        if(!error){
            res.status(200).send({
                titulo:"usuario Agregado Exitosamente"
            })
        }else{
            res.status(500).send({
                titulo:error.code,
                mensaje:error.message
            })
        }
    })
  }

  export const putUsuarios =  (req, res) => {
    let id = req.params.id;
    let frmData ={
        nombre:req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        contrasena: req.body.contrasena,
    }
    pool.query("UPDATE usuarios set ? WHERE id= ?",[frmData,id],(error,data)=>{
        if(!error)
        {
            res.status(200).send("usuario editado exitosamente")
        }else{
            res.status(500).send({
                titulo:error.code,
                mensaje:error.message
            })
        }
    })
  }

  export const deleteUsuario= (req, res) => {
    let id = req.params.id;
    let sql = "DELETE from usuarios WHERE id ="+id;
    pool.query(sql,(error,data)=>{
        if(!error){
            res.status(200).send("usuario eliminado con exito")
        }else{
            res.status(500).send({
            titulo:error.code,
            mensaje:error.message
        })}
    })
  }