import {Router} from 'express';
import {getUsuarios,postUsuarios,putUsuarios,deleteUsuario,getUsuariosNombre,getUsuariosRol} from '../controllers/usuarios.controllers.js'
const usuarios =Router();

  usuarios.get('/usuarios/listing', getUsuarios);
  
  usuarios.get('/usuarios/listingNombre/:nombre', getUsuariosNombre);

  usuarios.get('/usuarios/listingRol/:rol', getUsuariosRol);
  
  usuarios.post('/usuarios/create', postUsuarios);
  
  usuarios.put('/usuarios/update/:id', putUsuarios);
  
  usuarios.delete('/usuarios/delete/:id', deleteUsuario);

export default usuarios
