import { Router } from "express";
import { getCita } from "../controllers/citas.controllers.js";

const cita = Router()

cita.get('/cita/listing',getCita)

export default cita