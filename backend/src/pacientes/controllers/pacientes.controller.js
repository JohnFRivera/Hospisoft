import {pool} from '../../model/MySql.js';

export const getPaciente =(req,res)=>{
    let sql = "SELECT * FROM pacientes"

    pool.query(sql,(error,data)=>{
        if(!error){
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title:error.code,
                message: error.message

            })
        }
    })
}

export const postPaciente =(req,res)=>{
    console.log(req.body.nombre);
    let frmData={
        id:req.body.id,
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fecha_nacimiento: req.body.fecha_nacimiento,
        movil: req.body.movil,
        telefono: req.body.telefono,
        eps: req.body.eps
        
    }
    pool.query("INSERT INTO pacientes set ?",frmData,(error,data)=>{
        if(!error){
            res.status(200).send({
                title:"paciente Agregado Exitosamente"
            })
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
}

export const putPaciente =  (req, res) => {
    let id = req.params.id;
    let frmData ={
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        fecha_nacimiento: req.body.fecha_nacimiento,
        movil: req.body.movil,
        telefono: req.body.telefono,
        eps: req.body.eps
    }
    pool.query("UPDATE pacientes set ? WHERE id= ?",[frmData,id],(error,data)=>{
        if(!error)
        {
            res.status(200).send("paciente editado exitosamente")
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
  }

  export const deletePaciente= (req, res) => {
    let id = req.params.id;
    let sql = "DELETE from pacientes WHERE id ="+id;
    pool.query(sql,(error,data)=>{
        if(!error){
            res.status(200).send("paciente eliminado con exito")
        }else{
            res.status(500).send({
            title:error.code,
            message:error.message
        })}
    })
  }
  
  export const register = (req,res)=>{

    let formData =  {
      identificacion: req.body.identificacion,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      fecha_nacimiento: req.body.fecha_nacimiento,
      movil: req.body.movil,
      telefono: req.body.telefono,
      eps: req.body.eps,
      usuarios: req.body.usuario
    }
    let id = req.params.id
    sql="INSERT INTO pacientes SET ?"

    pool.query(sql,formData,(error,data)=>{
        if (!error) {
            res.status(200).send({
                title: "felicidades",
                message: `registrado con exito ${data[0].nombres}`
            })
        }else{
            res.status(500).send({
                title: error.code,
                message: error.message,
              });
        }
    })
  
  }