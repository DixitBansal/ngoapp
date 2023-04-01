const express = require("express");
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");
const { userRoutes } = require("./Routes/userRoutes");
require('dotenv').config();
const port=process.env.PORT
app.use(bodyParser.json({limit:"5mb"}));
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true,limit:"5mb"}));
app.use(cors())
app.use(express.json());
app.use((err, req, res, next) => {
    if(err.statusCode) {
        res.status(err.statusCode).send(err.message);
    } else {
        console.log(err);
        res.status(500).send('Something unexpected happened');
    }
});
app.use("/api/v1/user", userRoutes);
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})

