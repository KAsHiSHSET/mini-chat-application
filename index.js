/*const express=require("express")
const app=express();
const chat=require("./models/chat.js")
//mongoose setup
const mongoose =require("mongoose");
const path=require("path");
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");


main().then(()=>{
    console.log("conenecton established")
})
.catch(err=>console.log(err));
//making connection with databse whatsapp
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//insert  docuent into collection
let chat1= new chat({
    from:"neha",
    to:"priya",
    message:"send me your exam sheets",
    created_at:new Date()
})
chat1.save().then(res=>{
    console.log(res);
});
app.get("/",(req,res)=>{
    res.send("Hello, World!")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})*/
const express = require("express");
const app = express();
const Chat = require("./models/chat.js"); // Importing the Mongoose model
const mongoose = require("mongoose");
const path = require("path");
const e = require("express");
const methodoverride=require('method-override');
app.use(express.json());
// Setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//static files are being served from diectory public
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
// Connecting to MongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("Connection established");
}).catch(err => console.log(err));

// Insert document into collection
// let chat2 = new Chat({
//     from: "neha",
//     to: "riya",
//     message: "send me your exam sheets",
//     created_at: new Date()
// });

// chat2.save().then(res => {
//     console.log(res);
// }).catch(err => console.log(err));

// Route to home page
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    //fetching data from collections chat,print on /chats
    //res.send(chats);
    //render into a template
    res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    //renders new template
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let {from,to,message}=req.body;
    //now after parsing, i am adding new document into chats collection
    let newChat=new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date()});
    //async 
    newChat.save().then(res=>{
        console.log("chat was saved")
    }).catch(err=>console.log(err));
     res.redirect("/chats")
    
})
//edit 
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//update
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    //th message which came from the body of form
    let {message:newmsg}=req.body;
    let chat=await Chat.findByIdAndUpdate(id,{message:newmsg},{runValidators:true, new:true});
    // res.redirect("/chats")
   console.log(chat)
    res.redirect("/chats")
})
//desttroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let chat= await Chat.findByIdAndDelete(id);
    console.log(chat)
    res.redirect("/chats")})
// Start the server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
