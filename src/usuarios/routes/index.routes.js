import {Router} from 'express';
import {usuarioIndex} from '../controllers/index.controller.js'
const usuario = Router()


usuario.get('/usuarios',usuarioIndex);

export default usuario;
  