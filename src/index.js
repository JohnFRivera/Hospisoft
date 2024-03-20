import express from 'express';
import cors from 'cors';
import usuarios from './usuarios/routes/usuarios.routes.js'
import user from './usuarios/routes/index.routes.js'
const usuario = express();
const port = 3000;

usuario.use(cors());
usuario.use(express.json());
usuario.use(usuarios)
usuario.use(user)


usuario.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});