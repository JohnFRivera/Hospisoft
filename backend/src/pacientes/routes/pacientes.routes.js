import { Router } from "express";
import {getPaciente, postPaciente, putPaciente,deletePaciente} from  "../controllers/pacientes.controller.js"
const paciente =Router();

paciente.get('/pacientes/listing', getPaciente);

paciente.post('/pacientes/add', postPaciente);

paciente.put('/pacientes/edit/:id',  putPaciente)

paciente.delete('/pacientes/delete/:id', deletePaciente)
  

export default paciente