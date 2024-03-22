import { Router } from "express";
import {getPaciente} from '../../pacientes/controllers/pacientes.controller.js'
const paciente =Router();

paciente.get('/pacientes/listing', getPaciente);


  

export default paciente