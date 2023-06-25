const exp = require('express')
const studentApp = exp.Router();
const bodyParser = require('body-parser')
studentApp.use(exp.json());
const expressAsncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middle wares
studentApp.use(bodyParser.urlencoded({ extended: false }))

//Routes
//get Student Details
studentApp.get('/allStudents',expressAsncHandler(async(req,res)=>{
    const studentAcsObj = req.app.get('studentAcsObj');
    const allStudents = await studentAcsObj.find().toArray();
    // console.log('all students : ',allStudents)

    //remove password
    await allStudents.map(student => {
        delete student.password        
    });

    res.status(200).send({message:'all students',payload:allStudents})
}))
//Student SignUp
studentApp.post('/signup',expressAsncHandler(async(req,res)=>{
    const studentAcsObj = req.app.get('studentAcsObj');
    const newStudent = req.body
    newStudent.roll = newStudent.roll.toLowerCase();
    const studentOfDb = await studentAcsObj.findOne({roll:newStudent.roll});
    console.log('newStudent data : ' ,newStudent);
    console.log('studentOfDb : ',studentOfDb);
    if(studentOfDb !== null){
        //Roll is already used . send create success : false
        res.status(200).send({success: false, message:'Roll Number  Already Exists'})
    }else{
        //Roll is not used . hash password & replace . send create success : true
        const hashedPassword = await bcryptjs.hash(newStudent.password,3)
        newStudent.password= hashedPassword;
        // console.log('newStudent : ', newStudent,'\nhashedPassword : ',hashedPassword);
        await studentAcsObj.insertOne(newStudent);
        res.status(200).send({success:true})
    }
}))
//Student Login
studentApp.post('/login',expressAsncHandler(async(req,res)=>{
    
    const studentAcsObj = req.app.get('studentAcsObj');
    const loginCreds = req.body;
    console.log('login Credentials : ',loginCreds);
    loginCreds.roll = loginCreds.roll.toLowerCase();
    // console.log('login Credentials : ',loginCreds);
    const studentOfDb = await studentAcsObj.findOne({roll : (loginCreds.roll)});
    console.log('student of Db : ', studentOfDb);

    if(!studentOfDb) {
        //if roll number not found return success:false
        res.status(200).send({success: false , message:"no student found!"});
    } else {
        const result = await bcryptjs.compare(loginCreds.password,studentOfDb.password)
        if(result){
            //password matched . generate the token  & return success:true
            // console.log(process.env.SECRET_KEY)
            const token = jwt.sign(studentOfDb,process.env.SECRETE_KEY,{expiresIn:'7h'});
            // console.log('token : ',token);
            res.status(200).send({success:true,token:token});
        }
        else{
            //password not matched. return success:false
            res.status(200).send({success:false , message:"password didn't matched"});
        }
    }
}))
//Update Student
studentApp.post('/updateprofile',expressAsncHandler(async(req,res)=>{
    const studentAcsObj = req.app.get('studentAcsObj');
    const updatedDetails = req.body;
    //updateDetials = {roll,field,updatedFieldValue}
    if(updatedDetails[updatedDetails.field]){
        const studentOfDb = await studentAcsObj.findOne({roll : updatedDetails.roll});
        studentOfDb[updatedDetails.field] = updatedDetails[updatedDetails.field];
        // console.log(studentOfDb);
        const result = await studentAcsObj.updateOne({roll:updatedDetails.roll},{$set:{[updatedDetails.field] : updatedDetails[updatedDetails.field]}})
        console.log('response from mongo on update ~', result)
        res.status(200).send({success:true,message:'updated successfully'});
    }
    else{
        res.status(200).send({success:false,message:'updated value is empty!'});
    }

}))

module.exports = studentApp