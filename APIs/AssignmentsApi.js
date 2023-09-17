const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const assignments = exp.Router();
assignments.use(exp.json());

//middle wares 
assignments.use(bodyParser.urlencoded({ extended: false }))

// get all assignments of student 
assignments.post('/AllAssignments', expressAsncHandler(async (req, res) => {
    try {
      const student=req.body;
      const assignmentsObj = req.app.get('assignmentsObj');
      const allAssignments = await assignmentsObj.find({batch:student.batch}).toArray();
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
    const lastAssignment = await assignmentsObj.findOne({batch:fields.batch}, { sort: { assignmentId: -1 } });
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
assignments.get('/Assignment/:id', expressAsncHandler(async (req, res) => {
  try {
    const assignmentsObj = req.app.get('assignmentsObj');
    const assignment = await assignmentsObj.findById(req.params.assignmentId);
    if (!assignment) {
        return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}
}));

module.exports = assignments;
