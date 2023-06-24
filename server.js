// create the server
const exp = require('express');
const app = exp()
app.listen(3500,()=>{console.log('server is running on the port 3500')})

//requires
const cors = require('cors')
const studentApp = require('./APIs/StudentApi');
const mentorApp = require('./APIs/MentorApi')
const adminApp = require('./APIs/AdminApi') 
const mClient = require('mongodb').MongoClient
const jwt = require('jsonwebtoken')
require('dotenv').config();


//middle wares
app.use(exp.json())
app.use(cors())
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

//verify login token
app.post('/verifyLoginToken',async(req,res)=>{
    const {token} = req.body;
    console.log(token)
    try{
        const userData = await jwt.verify(token,process.env.SECRETE_KEY)
        if(userData) {
            delete userData.password;
            delete userData.iat;
            delete userData.exp;
            delete userData._id
            res.status(200).send({valid:true,payload:userData});
        }
        else res.status(200).send({valid:false})
    }catch{
        res.status(200).send({valid:false})
    }
}) 

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