import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true 
    },
    titulo:{
        type:String,
        require:true,
        trim: true
    },
    descripcion:{
        type:String,
        require:true
    },
    anio:{
        type:int,
        require:true
    },
    duracion:{
        type:int,
        require:true
    },
    generos:[{
        type:string
    }],
    idiomas_disponibles: [{
        type: string
    }],
    director:{
        type: String,
        require: true
    },
    fecha_agregado:{
        type: Date,
        default: Date.now
    },
    url:{
        type: String,
        require: true   
    }
    });

export default mongoose.model('pelicula', peliculaSchema)