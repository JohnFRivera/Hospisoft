import {pool} from '../../models/MySql.js'

export const getPaciente =(req,res)=>{
    let sql = "SELECT * FROM pacientes"

    pool.query(sql,(error,data)=>{
        if(!error)
        {res.status(200).send(data)
        }else{
            res.status(500).send({
                titulo:error.code,
                mensaje: error.message

            })
        }
    })
}

export const postPaciente =(req,res)=>{
    console.log(req.body.nombre);
    let frmData={
        nombre:req.body.nombre,
        apellidos: req.body.apellidos,
        fecha_Nacimiento: req.body.fecha_Nacimiento,
        genero: req.body.genero,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        eps: req.body.eps
        
    }
    pool.query("INSERT INTO pacientes set ?",frmData,(error,data)=>{
        if(!error){
            res.status(200).send({
                titulo:"paciente Agregado Exitosamente"
            })
        }else{
            res.status(500).send({
                titulo:error.code,
                mensaje:error.message
            })
        }
    })
}

export const putMedico =  (req, res) => {
    let id = req.params.id;
    let frmData ={       
        nombre:req.body.nombre,
        apellidos: req.body.apellidos,
        especialidad: req.body.especialidad,
        horario_atencion: req.body.horario_atencion,
    }
    pool.query("UPDATE medicos set ? WHERE id= ?",[frmData,id],(error,data)=>{
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

  export const deleteMedico= (req, res) => {
    let id = req.params.id;
    let sql = "DELETE from medicos WHERE id ="+id;
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