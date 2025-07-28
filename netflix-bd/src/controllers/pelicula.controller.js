import Pelicula from '../models/pelicula.model.js';

export const getPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching peliculas', error });
    }
};

export const createPelicula = async (req, res) => {
    const { titulo,descripcion,director,anio,generos,duracion,idiomas_disponibles,url } = req.body;

    try {
        const newPelicula = new Pelicula({
            titulo,
            descripcion,
            director,
            anio,
            generos,
            duracion,
            idiomas_disponibles,
            url
        });
        const savedPelicula = await newPelicula.save();
        res.status(201).json(savedPelicula);
    } catch (error) {
        res.status(500).json({ message: 'Error creating pelicula', error });
    }
};

export const getPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) return res.status(404).json({ message: 'Pelicula not found' });
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pelicula', error });
    }
};

export const deletePelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
        if (!pelicula) return res.status(404).json({ message: 'Pelicula not found' });
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pelicula', error });
    }
};

export const updatePelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pelicula) return res.status(404).json({ message: 'Pelicula not found' });
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ message: 'Error updating pelicula', error });
    }
};