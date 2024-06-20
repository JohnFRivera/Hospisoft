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
                success: true,
                title:"Felicidades",
                message: `Campaña <b>${formData.titulo}</b> Agregada Correctamente`
            })
        }else{
            res.status(500).send({
                success: false,
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
                success: true,
                title: "Felicidades",
                message:`Campaña <b>${id}</b> Eliminada Correctamente`
            })
        }else{
            res.status(500).send({
                success: false,
                title:error.code,
                message:error.message
            })
        }
    })
}