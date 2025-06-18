const { required } = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const NotesSchema = new schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true,
    },
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    
})

const NotesModel =mongoose.models.notes || mongoose.model('notes', NotesSchema);
module.exports = NotesModel;