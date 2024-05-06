import {pool} from '../../model/MySql.js';

export const getMedico =(req,res)=>{
    let sql = "SELECT * FROM medicos"

    pool.query(sql,(error,data)=>{
        if(!error)
        {res.status(200).send(data)
        }else{
            res.status(500).send({
                title:error.code,
                message: error.message

            })
        }
    })
}

export const postMedico =(req,res)=>{
    console.log(req.body.nombre);
    let frmData={
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        especialidad: req.body.especialidad
        
    }
    pool.query("INSERT INTO medicos set ?",frmData,(error,data)=>{
        if(!error){
            res.status(200).send({
                title:"medico Agregado Exitosamente"
            })
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
}

export const putMedico =  (req, res) => {
    let id = req.params.id;
    let frmData ={       
        id:req.body.id,
        identificacion: req.body.identificacion,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        especialidad: req.body.especialidad
    }
    pool.query("UPDATE medicos set ? WHERE id= ?",[frmData,id],(error,data)=>{
        if(!error)
        {
            res.status(200).send("usuario editado exitosamente")
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
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
            title:error.code,
            message:error.message
        })}
    })
  }