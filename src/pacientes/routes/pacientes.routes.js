import { Router } from "express";
import {getPaciente, postPaciente} from '../../pacientes/controllers/pacientes.controller.js'
const paciente =Router();

paciente.get('/pacientes/listing', getPaciente);

paciente.post('/pacientes/create', postPaciente);


  

export default paciente