import express from 'express';
import cors from 'cors';
import usuarios from './usuarios/routes/usuarios.routes.js'
import user from './usuarios/routes/index.routes.js'
import medicos from './medicos/routes/medicos.routes.js'
import pacientes from './pacientes/routes/pacientes.routes.js'
const usuario = express();
const port = 3000;

usuario.use(cors());
usuario.use(express.json());
usuario.use(usuarios)
usuario.use(user)
usuario.use(medicos)
usuario.use(pacientes)


usuario.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});