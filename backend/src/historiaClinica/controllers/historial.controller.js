import { pool } from "../../model/MySql.js";

export const getHistorial =(req,res)=>{
    let sql = "SELECT pacientes.nombres,formulas_medicas.examenes_medicos,formulas_medicas.diagnostico, formulas_medicas.medicinas FROM historias_clinicas JOIN pacientes ON historias_clinicas.FK_idPaciente = pacientes.id JOIN formulas_medicas ON historias_clinicas.FK_idFormula_medica = formulas_medicas.id;"

    pool.query(sql,(error,data)=>{
        if (!error) {
            res.status(200).send(data)
        }else{
            res.status(500).send({
                title: error.code,
                message:error.message
            })
        }
    });
}


