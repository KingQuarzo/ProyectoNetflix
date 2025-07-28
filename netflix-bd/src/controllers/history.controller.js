import History from '../models/history.model.js';

// Obtener todos los historiales
export const getHistories = async (req, res) => {
    try {
        const histories = await History.find().populate('subUserId').populate('peliculas.peliculaId');
        res.status(200).json(histories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching histories', error });
    }
};

// Obtener historial de un subusuario
export const getHistory = async (req, res) => {
    const { subUserId } = req.params;
    try {
        const history = await History.findOne({ subUserId }).populate('subUserId').populate('peliculas.peliculaId');
        if (!history) return res.status(404).json({ message: 'History not found' });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
};

// Crear historial o agregar visualización
export const createHistory = async (req, res) => {
    const { subUserId, peliculaId, tiempoVisualizacion } = req.body;

    if (!subUserId || !peliculaId || typeof tiempoVisualizacion !== 'number') {
        return res.status(400).json({ message: 'subUserId, peliculaId y tiempoVisualizacion son requeridos.' });
    }

    try {
        let history = await History.findOne({ subUserId });

        if (!history) {
            history = new History({
                subUserId,
                peliculas: [{ peliculaId, tiempoVisualizacion }]
            });
        } else {
            const peliculaIndex = history.peliculas.findIndex(
                p => p.peliculaId.toString() === peliculaId
            );
            if (peliculaIndex > -1) {
                history.peliculas[peliculaIndex].tiempoVisualizacion = tiempoVisualizacion;
            } else {
                history.peliculas.push({ peliculaId, tiempoVisualizacion });
            }
        }

        const savedHistory = await history.save();
        res.status(201).json(savedHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating history', error });
    }
};

// Actualizar historial (actualiza tiempo de visualización de una película)
export const updateHistory = async (req, res) => {
    const { subUserId, peliculaId, tiempoVisualizacion } = req.body;

    if (!subUserId || !peliculaId || typeof tiempoVisualizacion !== 'number') {
        return res.status(400).json({ message: 'subUserId, peliculaId y tiempoVisualizacion son requeridos.' });
    }

    try {
        const history = await History.findOne({ subUserId });
        if (!history) return res.status(404).json({ message: 'History not found' });

        const peliculaIndex = history.peliculas.findIndex(
            p => p.peliculaId.toString() === peliculaId
        );
        if (peliculaIndex > -1) {
            history.peliculas[peliculaIndex].tiempoVisualizacion = tiempoVisualizacion;
            const updatedHistory = await history.save();
            res.status(200).json(updatedHistory);
        } else {
            res.status(404).json({ message: 'Movie not found in history' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating history', error });
    }
};

// Eliminar historial de un subusuario
export const deleteHistory = async (req, res) => {
    const { subUserId } = req.params;
    try {
        const deleted = await History.findOneAndDelete({ subUserId });
        if (!deleted) return res.status(404).json({ message: 'History not found' });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting history', error });