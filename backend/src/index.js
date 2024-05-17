import express from 'express';
import cors from 'cors';
import usuariosRouter  from './usuario/routes/usuario.routes.js'
import pacientesRouter from './pacientes/routes/pacientes.routes.js'
import medicosRouter from './medicos/routes/medicos.routes.js'
import medicamentosRouter from './medicamentos/routes/medicamentos.routes.js'
import historialRouter from './historiaClinica/routes/historial.routes.js'
import citaRouter from './citas/routes/citas.routes.js'
import campañaRouter from './campañas/routes/campañas.routes.js'
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.use(usuariosRouter )
app.use(pacientesRouter)
app.use(medicosRouter)
app.use(medicamentosRouter)
app.use(historialRouter)
app.use(citaRouter)
app.use(campañaRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})