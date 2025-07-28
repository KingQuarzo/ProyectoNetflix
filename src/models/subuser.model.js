import mongoose from "mongoose";

const subUserSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true 
    },
    fatherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username:{
        type:String,
        require:true,
        trim: true
    },
    fecha_creacion:{
        type:Date,
        default: Date.now
    },
    estado:{
        type:Boolean,
        default: false
    }
    });

export default mongoose.model('subUser', subUserSchema)