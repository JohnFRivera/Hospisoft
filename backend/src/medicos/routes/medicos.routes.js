import {Router} from 'express';
import {getMedico,postMedico,putMedico, deleteMedico, getMedicoForSelect} from '../../medicos/controllers/medicos.controllers.js'
const medico =Router();

medico.get('/medicos/select', getMedicoForSelect);

medico.get('/medicos/listing', getMedico);

medico.post('/medicos/add', postMedico);

medico.put('/medicos/edit/:id', putMedico);
    
medico.delete('/medicos/delete/:id', deleteMedico);
  

export default medico

