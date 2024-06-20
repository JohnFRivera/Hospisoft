import { pool } from "../../model/MySql.js";

export const geInfoPaciente = (req, res) => {
    let sql = "SELECT pacientes.id,pacientes.nombres,pacientes.apellidos,pacientes.eps FROM historias_clinicas JOIN pacientes ON historias_clinicas.FK_idPaciente = pacientes.id GROUP BY pacientes.nombres"

    pool.query(sql, (error, data) => {
        if (!error) {
            res.status(200).send(data)
        } else {
            res.status(500).send({
                title: error.code,
                message: error.message
            })
        }
    });
}

export const geInfoHistorias = (req, res) => {
    let id = req.params.id;
    let sql = "SELECT nombres, apellidos FROM pacientes WHERE id = " + id;
    pool.query(sql, (error, data) => {
        if (!error) {
            let finishData = {
                paciente: `${data[0].nombres} ${data[0].apellidos}`
            };
            sql = "SELECT formulas_medicas.diagnostico,formulas_medicas.medicinas,formulas_medicas.examenes_medicos FROM historias_clinicas JOIN formulas_medicas ON historias_clinicas.FK_idFormula_medica = formulas_medicas.id WHERE historias_clinicas.FK_idPaciente = " + id;
            pool.query(sql, (error, data) => {
                if (!error) {
                    finishData.data = data;
                    res.status(200).send(finishData)
                } else {
                    res.status(500).send({
                        title: error.code,
                        message: error.message
                    })
                }
            });
        } else {
            res.status(500).send({
                title: error.code,
                message: error.message
            })
        }
    });
}
