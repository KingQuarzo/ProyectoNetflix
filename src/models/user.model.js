import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        auto: true 
    },
    email:{
        type:String,
        require:true,
        trim: true,
        unique:true,
        match: /.+\@.+\..+/
    },
    username:{
        type:String,
        require:true,
        trim: true
    },
    password:{
        type:String,
        require:true
    },
    fecha_creacion:{
        type:Date,
        default: Date.now
    },
    estado:{
        type:Boolean,
        default: false
    },
    subUsuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subuser',
    }]
    });

export default mongoose.model('User', userSchema)