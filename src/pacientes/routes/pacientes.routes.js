import { Router } from "express";
import {getPaciente, postPaciente, putPaciente,deletePaciente} from '../../pacientes/controllers/pacientes.controller.js'
const paciente =Router();

paciente.get('/pacientes/listing', getPaciente);

paciente.post('/pacientes/create', postPaciente);

paciente.put('/paciente/update/:id',putPaciente )

paciente.delete('/paciente/delete/:id', deletePaciente)
  

export default paciente