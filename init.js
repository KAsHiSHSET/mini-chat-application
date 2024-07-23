const Chat = require("./models/chat.js"); // Importing the Mongoose model
const mongoose = require("mongoose");

main().then(() => {
    console.log("Connection established");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchat=[
    {
        from: "riya",
        to: "neha",
        message: "hi",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "riya",
        message: "okay",
        created_at: new Date()
    },
    {
        from: "riya",
        to: "neha",
        message: "can you please check the exam",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "riya",
        message: "yes, I have them",
        created_at: new Date()
    },{
        from: "neha",
        to: "riya",
        message: "thank you",
        created_at: new Date()
    }
    ,{
        from: "riya",
        to: "neha",
        message: "please send",
        created_at: new Date()
    }

]
/*let chat2 = new Chat({
    from: "neha",
    to: "riya",
    mge: "send me your exam sheets",
    created_at: new Date()
});*/
Chat.insertMany(allchat);