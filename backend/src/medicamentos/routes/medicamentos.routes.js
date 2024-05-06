import { Router } from "express";
import { getMedicamentos, postMedicamentos, putMedicamentos, deleteMedicamento } from "../controllers/medicamentos.controllers.js";
const medicamento = Router()

medicamento.get('/medicamentos/listing',getMedicamentos)

medicamento.post('/medicamentos/add', postMedicamentos)

medicamento.put('/medicamentos/edit/:id', putMedicamentos)

medicamento.delete('/medicamentos/delete/:id', deleteMedicamento)

export default medicamento