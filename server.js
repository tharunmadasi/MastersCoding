// create the server
const exp = require('express');
const app = exp()
app.listen(3500,()=>{console.log('server is running on the port 3500 ')})

//requires
const studentApp = require('./APIs/StudentApi');
const mentorApp = require('./APIs/MentorApi')
const adminApp = require('./APIs/AdminApi') 
const mClient = require('mongodb').MongoClient
require('dotenv').config();

//middle wares
app.use(exp.json())

//connect to Database 
mClient.connect('mongodb://127.0.0.1:27017')
.then(dbServerRef=>{
    const MCdb = dbServerRef.db('MC');
    const studentAcsObj = MCdb.collection('studentAcs');
    const mentorAcsObj = MCdb.collection('mentorAcs');
    const adminAcsObj = MCdb.collection('adminAcs')
    app.set('studentAcsObj',studentAcsObj);
    app.set('mentorAcsObj',mentorAcsObj);
    app.set('adminAcsObj',adminAcsObj);
    console.log('Database connection Success!');
})
.catch((err)=>{
    console.log('error in Connecting to database! : ',err)
})
//Routes
app.use('/student',studentApp);
app.use('/mentor',mentorApp);
app.use('/admin',adminApp)

//error handling middleware
const errorHandlingMiddleWare = (err,req, res , next)=>{
    console.log('Error occured in server! Error is :' ,err);
    res.status(200).send({message:'error occured in the srever',error:err.message})
}
app.use(errorHandlingMiddleWare)
//invalid path middleware
const invalidPathMiddleWare = (req,res)=>{
    console.log('Invalid Path:');
    res.status(404).json({message:'Invalid Path'});
}
app.use('*',invalidPathMiddleWare)