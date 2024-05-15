import { Router } from "express";
import { getEspecialista, postCita } from "../controllers/citas.controllers.js";

const cita = Router()

cita.get('/cita/listing',getEspecialista)
cita.post('/cita/add', postCita)

export default cita