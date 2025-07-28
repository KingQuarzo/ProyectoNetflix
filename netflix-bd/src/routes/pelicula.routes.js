import { Router } from "express";
import {
    getPeliculas,
    getPelicula,
    createPelicula,
    updatePelicula,
    deletePelicula
} from "../controllers/pelicula.controller.js";

const router = Router();

router.get('/peliculas', getPeliculas);
router.get('/peliculas/:id', getPelicula);
router.post('/peliculas', createPelicula);
router.put('/peliculas/:id', updatePelicula);
router.delete('/peliculas/:id', deletePelicula);

export default router;