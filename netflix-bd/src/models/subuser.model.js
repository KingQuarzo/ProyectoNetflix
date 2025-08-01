import mongoose from "mongoose";

const subUserSchema = new mongoose.Schema({
    fatherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username:{
        type:String,
        require:true,
    },
    fecha_creacion:{
        type:Date,
        default: Date.now
    },
    estado:{
        type:Boolean,
        default: false
    },
    ubicacion:{
        type:String,
        require:true,
    },
    });

export default mongoose.model('subUser', subUserSchema)