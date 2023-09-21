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
      const mentor = req.body;
      console.log("Mentor :",mentor);
      mentor.assignmentID = parseInt(mentor.assignmentID, 10);
      const sectionSubmission = await submissionsObj.find({$and:[{section:mentor.section,assignmentId:mentor.assignmentID}]}).toArray();
      console.log("Section Submissions :",sectionSubmission)
      res.send({submissions:sectionSubmission})
      console.log(sectionSubmission)
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

// update the status of a particular submission and add the remarks
submissions.post('/updateStatus/:Sid', expressAsncHandler(async (req, res) => {
  try {
    const submissionsObj = req.app.get('submissionsObj');
    const submission = req.body;
    const Sid = req.params.Sid;

    console.log("Updating ID:", Sid);
    console.log("Update Data:", submission);

    // If you're using the MongoDB native driver, remember to convert Sid to an ObjectId
    const { ObjectId } = require('mongodb');
    const objectId = new ObjectId(Sid);

    const result = await submissionsObj.updateOne({ _id : objectId }, { $set: { status: "verified", remarks: submission.remarks } });
    res.status(200).json({ message: 'Status updated successfully', updatedCount: result.modifiedCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error updating status', error: err.message });
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