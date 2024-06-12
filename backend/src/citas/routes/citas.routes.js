import { Router } from "express";
import { getCita, getEspecialista, postCita } from "../controllers/citas.controllers.js";

const cita = Router()

cita.get('/cita/listing',getCita)
cita.get('/cita/getespecialista',getEspecialista)
cita.post('/cita/add', postCita)


export default cita