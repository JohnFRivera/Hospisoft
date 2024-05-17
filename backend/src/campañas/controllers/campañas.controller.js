import {pool} from '../../model/MySql.js';

export const postCampaña =(req,res)=>{
    
    let formData = {
        titulo: req.body.titulo,
        fecha: req.body.fecha,
        hora: req.body.hora
    }

    
    pool.query('INSERT INTO campañas SET ?',formData,(error,data)=>{
        if (!error) {
            res.status(200).send({
                succes: true,
                title:"Felicidades",
                message:"campaña agregada con exito"
            })
        }else{
            res.status(500).send({
                succes: false,
                title:error.code,
                message:error.message
            })
        }
    })
}

export const getCampaña=(req,res)=>{

    pool.query('SELECT * FROM campañas',(error,data)=>{
        if (!error) {
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
}

export const deleteCampaña=(req,res)=>{

    let id = req.params.id

    pool.query('DELETE FROM campañas WHERE id = ?',id,(error,data)=>{
        if (!error) {
            res.status(200).send({
                title:"eliminado",
                message:"campaña eliminada con exito"
            })
        }else{
            res.status(500).send({
                title:error.code,
                message:error.message
            })
        }
    })
}