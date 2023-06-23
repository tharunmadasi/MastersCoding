const exp = require('express')
const mentorApp = exp.Router();
const bodyParser = require('body-parser')
mentorApp.use(exp.json());
const expressAsncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middle wares
mentorApp.use(bodyParser.urlencoded({ extended: false }))

//Routes
//get Mentors Details
mentorApp.get('/allMentors',expressAsncHandler(async(req,res)=>{
    const mentorAcsObj = req.app.get('mentorAcsObj');
    const allMentors = await mentorAcsObj.find().toArray();
    // console.log('all mentors : ',allMentors)

    //remove password
    await allMentors.map(mentor => {
        delete mentor.password        
    });
    res.status(200).send({message:'all mentors',payload:allMentors})
}))
//Mentor SignUp
mentorApp.post('/signup',expressAsncHandler(async(req,res)=>{
    const mentorAcsObj = req.app.get('mentorAcsObj');
    const newMentor = req.body
    newMentor.roll = newMentor.roll.toLowerCase();
    const mentorOfDb = await mentorAcsObj.findOne({roll:newMentor.roll});
    // console.log('newMentor data : ' ,newMentor);
    // console.log('mentorOfDb : ',mentorOfDb);
    if(mentorOfDb !== null){
        //Roll is already used . send create success : false
        res.status(200).send({success: false, message:'Roll Number  Already Exists'})
    }else{
        //Roll is not used . hash password & replace . send create success : true
        const hashedPassword = await bcryptjs.hash(newMentor.password,3)
        newMentor.password= hashedPassword;
        // console.log('newMentor : ', newMentor,'\nhashedPassword : ',hashedPassword);
        await mentorAcsObj.insertOne(newMentor);
        res.status(200).send({success:true})
    }
}))
//Mentor Login
mentorApp.post('/login',expressAsncHandler(async(req,res)=>{
    const mentorAcsObj = req.app.get('mentorAcsObj');
    const loginCreds = req.body;
    loginCreds.roll = loginCreds.roll.toLowerCase();
    // console.log('login Credentials : ',loginCreds);
    const mentorOfDb = await mentorAcsObj.findOne({roll : (loginCreds.roll)});
    // console.log('student of Db : ', mentorOfDb);

    if(mentorOfDb === null) {
        //if roll number not found return success:false
        res.status(200).send({success: false , message:"no mentor found!"});
    } else {
        const result = await bcryptjs.compare(loginCreds.password,mentorOfDb.password)
        if(result){
            //password matched . generate the token  & return success:true
            // console.log(process.env.SECRET_KEY)
            const token = jwt.sign(mentorOfDb,process.env.SECRETE_KEY,{expiresIn:'7d'});
            // console.log('token : ',token);
            res.status(200).send({success:true,token:token});
        }
        else{
            //password not matched. return success:false
            res.status(200).send({success:false , message:"password didn't matched"});
        }
    }
}))


module.exports=mentorApp;