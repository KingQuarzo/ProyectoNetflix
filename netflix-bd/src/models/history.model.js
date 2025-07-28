import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    subUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subUser',
        required: true
    },
    peliculas: [
        {
            peliculaId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pelicula',
                required: true
            },
            tiempoVisualizacion: {
                type: Number, // minutos
                required: true
            }
        }
    ]
});

export default mongoose.model('History', historySchema);