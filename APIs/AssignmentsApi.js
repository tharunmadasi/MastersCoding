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
      const result = await assignmentsObj.insertOne(fields);
      res.status(200).json({ message: 'Fields created successfully', insertedCount: result.insertedCount });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error creating fields', error: err.message });
    }
}));

module.exports = assignments;
