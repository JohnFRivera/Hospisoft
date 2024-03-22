import {Router} from 'express';
import {getMedico,postMedico,putMedico, deleteMedico} from '../../medicos/controllers/medicos.controllers.js'
const medico =Router();

medico.get('/medicos/listing', getMedico);

medico.post('/medicos/create', postMedico);

medico.put('/medicos/update/:id', putMedico);

medico.delete('/medicos/delete/:id', deleteMedico);
  

export default medico

