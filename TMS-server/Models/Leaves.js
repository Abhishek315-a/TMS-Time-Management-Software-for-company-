const mongoose = require("mongoose");

const schema = mongoose.Schema;

const LeaveSchema  = new schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // match your User model name
    required: true,
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true,
    },
    reason:{
        type:String,
        required:true
    },
});

const LeaveModel = mongoose.model("leaves",LeaveSchema);

module.exports = LeaveModel;
