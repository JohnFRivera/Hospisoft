import {Router} from 'express';
import { getHistorial } from '../controllers/historial.controller.js';

const historial = Router();

historial.get('/historial/listing', getHistorial);

export default historial;