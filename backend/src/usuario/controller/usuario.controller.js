import {pool} from '../../model/MySql.js';


export const getUsuarios = (req, res) => {

    let sql ="SELECT * FROM usuarios "
    
    pool.query(sql, (error, data) => {
      if(!error){
        res.status(200).send(data)
      }else{
        res.status(500).send({
          title:error.code,
            message:error.message
        })
      }
    });
  }

  export const postUsuarios =  (req, res) => {
   console.log(req.body);
    let frmData={
        id: req.body.id,
        identificacion: req.body.identificacion,
        usuario: req.body.usuario, 
        email: req.body.email,
        contraseña: req.body.contraseña,
        rol: req.body.rol
        
    } 

    pool.query("INSERT INTO usuarios set ?",frmData,(error,data)=>{
        if(!error){
            res.status(200).send({
              title: "Agregado exitosamente",
              message: `Usuario <b class="text-primary">${frmData.nombre} ${frmData.apellidos}</b> agregado correctamente.`
            })
        }else{
            res.status(500).send({
              title:error.code,
                message:error.message
            })
        } 
    }) 
  }

  export const putUsuarios =  (req, res) => {
    let id = req.params.id;
    let frmData={
        identificacion: req.body.identificacion,
        usuario: req.body.usuario, 
        email: req.body.email,
        contraseña: req.body.contraseña,
        rol: req.body.rol
        
    } 
    pool.query("UPDATE usuarios set ? WHERE id= ?",[frmData,id],(error,data)=>{
        if(!error)
        {
            res.status(200).send("editado")
        }else{
            res.status(500).send({
              title:error.code,
                message:error.message
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
              title:error.code,
            message:error.message
        })}
    })
  }

