import { pool } from "../../model/MySql.js";

export const getEspecialista=(req,res)=>{
    let sql = "SELECT medicos.especialidad, citas.fecha, citas.hora FROM citas INNER JOIN medicos ON citas.FK_idMedico = medicos.id;"
    pool.query(sql,(error,data)=>{
        if (!error) {
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title: error.code,
                message: error.message
            })
        }
    });
} 

export const getMedicos = (req, res) => {
    let sql = "SELECT id, nombres FROM medicos";
    pool.query(sql, (error, data) => {
        if (!error) {
            res.status(200).send(data);
        } else {
            res.status(500).send({
                title: error.code,
                message: error.message
            });
        }
    });
};


export const verificarCita =(req,res,next)=>{
    const { FK_idMedico, fecha, hora } = req.body;
const sql = `SELECT COUNT(*) AS count 
                 FROM citas 
                 WHERE FK_idMedico = ? 
                 AND fecha = ? 
                 AND hora = ?`;

    pool.query(sql,[FK_idMedico, fecha, hora], (error, results) => {
        if (error) {
            return res.status(500).send({
                title: error.code,
                message: error.message
            });
        }

        if (results[0].count > 0) {
            return res.status(400).send({
                message: "Ya existe una cita para este médico en la fecha y hora especificadas."
            });
        }

        next();
    });
} 


export const getCita=(req,res)=>{
    let sql = `SELECT pacientes.nombres, medicos.apellidos, 
               DATE_FORMAT(citas.fecha, '%Y-%m-%d') AS fecha, 
               citas.hora 
               FROM citas 
               INNER JOIN medicos ON citas.FK_idMedico = medicos.id 
               INNER JOIN pacientes ON citas.FK_idPaciente = pacientes.id;`
    pool.query(sql,(error,data)=>{
        if (!error) {
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title: error.code,
                message: error.message
            })
        }
    });
} 

export const postCita = (req,res) =>{
    let formData ={
        FK_idPaciente: req.body.FK_idPaciente,
        FK_idMedico: req.body.FK_idMedico,
        fecha: req.body.fecha,
        hora: req.body.hora
    }
    let sql = `INSERT INTO citas set ?`

pool.query(sql,formData,(error,data)=>{
    if (!error) {
        res.status(200).send({
            title:"Cita Agregada Exitosamente"
        })
    }else{
        res.status(500).send({
            title: error.code,
            message: error.message
        })
    }
})
}

