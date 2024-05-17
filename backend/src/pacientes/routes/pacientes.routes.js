import { Router } from "express";
import {getPaciente, postPaciente, putPaciente,deletePaciente, register} from  "../controllers/pacientes.controller.js"
const paciente =Router();

paciente.get('/pacientes/listing', getPaciente);

paciente.post('/pacientes/add', postPaciente);

paciente.put('/pacientes/edit/:id',  putPaciente)

paciente.delete('/pacientes/delete/:id', deletePaciente)
  
paciente.post('/pacientes/register', register)
export default paciente