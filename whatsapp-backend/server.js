// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from "cors";
 //app config
const app=express();
const port=process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1433743",
    key: "fbb53bb6de7415824b73",
    secret: "2e46cf5f3475922c3c0a",
    cluster: "ap2",
    useTLS: true
  });

const db= mongoose.connection

db.once("open",() => {
    console.log("DB is connected");
    
    const msgCollection= db.collection("messagecontents");
   const changeStream= msgCollection.watch();
   
   changeStream.on("change",(change) => {
       console.log(change);

       if(change.operationType === 'insert'){
           const messageDetails= change.fullDocument;
           pusher.trigger('messages','inserted',{
               name: messageDetails.name,
               message: messageDetails.message,
               timestamp: messageDetails.timestamp,
                received: messageDetails.received,
           }
           );
       }
       else{
           console.log('Error triggering Pusher')
       }
   });
});


//middleware
  app.use(express.json());
  app.use(cors());



//DB config
const connection_url="mongodb+srv://abhi816109:abhishek123@cluster0.m4t8els.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    
});

//api routes
app.get("/",(req,res) => res.status(200).send('hello'))

app.get("/messages/sync",(req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
});
});


app.post("/messages/new", (req,res) => {
    const dbMessage=req.body
  
     Messages.create(dbMessage, (err,data) => {
         if(err){
             res.status(500).send(err)
         }
         else{
             res.status(201).send(data)
         }
     })
})



app.listen(port, () => console.log(`listening on localhost: ${port}`));