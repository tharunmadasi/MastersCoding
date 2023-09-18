const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const submissions = exp.Router();
submissions.use(exp.json());



//middle wares
submissions.use(bodyParser.urlencoded({ extended: false }))

//Get all submitted assignments of a section
submissions.post('/sectionSubmitted',expressAsncHandler(async(req,res)=>{
    try{
      const submissionsObj = req.app.get('submissionsObj');
      const mentor =req.body;
      // console.log("Mentor :",mentor);
      const sectionSubmission = await submissionsObj.find({$and:[{section:mentor.section},{batch:mentor.batch}]}).toArray();
      res.send({submissions:sectionSubmission})
      console.log(sectionAssignments)
    }
    catch(err){
        console.log("Error in getting all submmsions based on seciton: " , err)
        res.send({message:"error ",err :err})
    }
  }
))

// get all submissions of a particular user based on roll
submissions.post('/AllSubmissions', expressAsncHandler(async (req, res) => {
    try {
      const submissionsObj = req.app.get('submissionsObj');
      const student =req.body;
      // console.log(student);
      const allSubmissions = await submissionsObj.find({roll:student.roll}).toArray();
      res.status(200).json({ submissions: allSubmissions });
    } catch (err) { 
      console.log(err);
      res.status(500).json({ message: 'Error retrieving submissions', error: err.message });
    }
  }
));

// Handle the route for creating fields in the submissions collection
submissions.post('/upload', expressAsncHandler(async (req, res) => {
    try {
        const submissionsObj = req.app.get('submissionsObj');
        let fields = req.body;
        fields.status = 'submitted'
        console.log(fields)
        const result = await submissionsObj.insertOne(fields);

        // add timestamp to the fields
        await submissionsObj.updateOne({ _id: result.insertedId }, { $set: { subissionTimeStamp: result.insertedId.getTimestamp() } });

        res.status(200).send({ message: 'Fields created successfully', insertedCount: result.insertedCount });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error creating fields', error: err.message });
    }
})); 

module.exports = submissions;