const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const submissions = exp.Router();
submissions.use(exp.json());

//middle wares
submissions.use(bodyParser.urlencoded({ extended: false }))

// get all submissions
submissions.get('/AllSubmissions', expressAsncHandler(async (req, res) => {
    try {
      const submissionsObj = req.app.get('submissionsObj');
      const allSubmissions = await submissionsObj.find({}).toArray();
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
        const fields = req.body;

        // Generate a new submission ID starting from 1
        const lastSubmission = await submissionsObj.findOne({}, { sort: { submissionId: -1 } });
        const submissionId = lastSubmission ? lastSubmission.submissionId + 1 : 1;

        // Assign the generated submission ID to the fields
        fields.submissionId = submissionId;
        const result = await submissionsObj.insertOne(fields);

        // add timestamp to the fields
        await submissionsObj.updateOne({ _id: result.insertedId }, { $set: { timestamp: result.insertedId.getTimestamp() } });

        res.status(200).json({ message: 'Fields created successfully', insertedCount: result.insertedCount });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating fields', error: err.message });
    }
})); 

module.exports = submissions;