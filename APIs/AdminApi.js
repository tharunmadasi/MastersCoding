const exp = require('express')
const adminApp = exp.Router();
const bodyParser = require('body-parser')
adminApp.use(exp.json());
const expressAsncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middle wares
adminApp.use(bodyParser.urlencoded({ extended: false }))

//Routes
//get Admin Details
adminApp.get('/allAdmins',expressAsncHandler(async(req,res)=>{
    const adminAcsObj = req.app.get('adminAcsObj');
    const allAdmins = await adminAcsObj.find().toArray();
    // console.log('all Admins : ',allAdmins)
    res.status(200).send({message:'all Admins',payload:allAdmins})
}))
//Admin SignUp
adminApp.post('/signup',expressAsncHandler(async(req,res)=>{
    const adminAcsObj = req.app.get('adminAcsObj');
    const newAdmin = req.body;
    newAdmin.roll = newAdmin.roll.toLowerCase();
    const adminOfDb = await adminAcsObj.findOne({roll:newAdmin.roll});
    // console.log('newAdmin data : ' ,newAdmin);
    // console.log('adminOfDb : ',adminOfDb);
    if(adminOfDb !== null){
        //Roll is already used . send create success : false
        res.status(200).send({success: false, message:'Roll Number  Already Exists'})
    }else{
        //Roll is not used . hash password & replace . send create success : true
        const hashedPassword = await bcryptjs.hash(newAdmin.password,3)
        newAdmin.password= hashedPassword;
        // console.log('newAdmin : ', newAdmin,'\nhashedPassword : ',hashedPassword);
        await adminAcsObj.insertOne(newAdmin);
        res.status(200).send({success:true})
    }
}))
//Admin Login
adminApp.post('/login',expressAsncHandler(async(req,res)=>{
    const adminAcsObj = req.app.get('adminAcsObj');
    const loginCreds = req.body;
    loginCreds.roll = loginCreds.roll.toLowerCase();
    const adminOfDb = await adminAcsObj.findOne({roll : (loginCreds.roll)});
    // console.log('login Credentials : ',loginCreds);
    // console.log('admin of Db : ', adminOfDb);

    if(adminOfDb === null) {
        //if roll number not found return success:false
        res.status(200).send({success: false , message:"no admin found!"});
    } else {
        const result = await bcryptjs.compare(loginCreds.password,adminOfDb.password)
        if(result){
            //password matched . generate the token  & return success:true
            // console.log(process.env.SECRET_KEY)
            const token = jwt.sign(adminOfDb,process.env.SECRET_KEY,{expiresIn:'7d'});
            // console.log('token : ',token);
            res.status(200).send({success:true,token:token});
        }
        else{
            //password not matched. return success:false
            res.status(200).send({success:false , message:"password didn't matched"});
        }
    }
}))

module.exports=adminApp