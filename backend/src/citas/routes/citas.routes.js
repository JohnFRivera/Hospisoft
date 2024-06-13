import { Router } from "express";
import { getCita, getEspecialista, getMedicos, postCita, verificarCita } from "../controllers/citas.controllers.js";

const cita = Router()

cita.get('/cita/listing',getCita)
cita.get('/cita/listingMedico', getMedicos);
cita.get('/cita/getespecialista',getEspecialista)
cita.post('/cita/add', postCita)
cita.post('/cita/verificar', verificarCita, postCita);


export default cita