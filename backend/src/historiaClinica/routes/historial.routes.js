import {Router} from 'express';
import { geInfoPaciente, geInfoHistorias } from '../controllers/historial.controller.js';

const historial = Router();

historial.get('/historial/getpaciente', geInfoPaciente);
historial.get('/historial/gethistorial', geInfoHistorias);

export default historial;