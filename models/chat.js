/*const mongoose=require("mongoose");
const chatschema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        maxlength:50,
    },
    created_at:{
        type:Date,
        required:true,
    },
})
//model which follows the schema
//models name and collection are same 
const chat= mongoose.model("chat",chatschema);
module.exports=chat
//now we will require this collection in index,js*/
//............//
//mongoose model
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type:String,
        required:true,
    },
    to:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        maxlength: 50,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;


