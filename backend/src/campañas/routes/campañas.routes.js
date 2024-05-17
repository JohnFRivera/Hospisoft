
import { Router } from "express";
import { deleteCampaña, getCampaña, postCampaña } from "../controllers/campañas.controller.js";

const campaña = Router();

campaña.get('/campana/listing', getCampaña )
campaña.post('/campana/add', postCampaña)
campaña.delete('/campana/delete/:id',deleteCampaña)

export default campaña