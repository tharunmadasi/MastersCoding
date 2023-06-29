const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const classes = exp.Router();
classes.use(exp.json());

//middle wares
classes.use(bodyParser.urlencoded({ extended: false }))

// get all classes
classes.get('/AllClasses', expressAsncHandler(async (req, res) => {
    try {
      const classesObj = req.app.get('classesObj');
      const allclasses = await classesObj.find({}).toArray();
      res.status(200).json({ classes: allclasses });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving classes', error: err.message });
    }
  }));

// Handle the route for creating fields in the assigments collection
classes.post('/upload', expressAsncHandler(async (req, res) => {
    try {
      const classesObj = req.app.get('classesObj');
      const fields = req.body;
      const result = await classesObj.insertOne(fields);
      res.status(200).json({ message: 'Fields created successfully', insertedCount: result.insertedCount });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error creating fields', error: err.message });
    }
}));

module.exports = classes;
