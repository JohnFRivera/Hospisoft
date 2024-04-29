import express from 'express';
import cors from 'cors';
import usuariosRouter  from './usuario/routes/usuario.routes.js'
import pacientesRouter from './pacientes/routes/pacientes.routes.js'
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.use(usuariosRouter )
app.use(pacientesRouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})