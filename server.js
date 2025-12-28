const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const connectDb  = require('./src/config/db');
const authRouter = require('./routes/userAuth.js');

app.use('/user',authRouter);



require('dotenv').config();
const Port=process.env.PORT

app.listen(process.env.PORT,(req,res)=>{
  console.log(`SERVER CONNECTED ${process.env.PORT}`);
  connectDb();
  })