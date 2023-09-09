const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const assignments = exp.Router();
assignments.use(exp.json());

//middle wares 
assignments.use(bodyParser.urlencoded({ extended: false }))

// get all assignments
assignments.get('/AllAssignments', expressAsncHandler(async (req, res) => {
    try {
      const assignmentsObj = req.app.get('assignmentsObj');
      const allAssignments = await assignmentsObj.find({}).toArray();
      res.status(200).json({ assignments: allAssignments });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving assignments', error: err.message });
    }
  }));

// Handle the route for creating fields in the assigments collection
assignments.post('/upload', expressAsncHandler(async (req, res) => {
  try {
    const assignmentsObj = req.app.get('assignmentsObj');
    const fields = req.body;

    // Generate a new assignment ID starting from 1
    const lastAssignment = await assignmentsObj.findOne({}, { sort: { assignmentId: -1 } });
    const assignmentId = lastAssignment ? lastAssignment.assignmentId + 1 : 1;
    
    // Assign the generated assignment ID to the fields
    fields.assignmentId = assignmentId;

    const result = await assignmentsObj.insertOne(fields);
    // add timestamp to the fields
    await assignmentsObj.updateOne({ _id: result.insertedId }, { $set: { timestamp: result.insertedId.getTimestamp() } });

    res.status(200).json({ message: 'Fields created successfully', insertedCount: result.insertedCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating fields', error: err.message });
  }
}));
// get assignments by ID
assignments.get('Assignment')

module.exports = assignments;
