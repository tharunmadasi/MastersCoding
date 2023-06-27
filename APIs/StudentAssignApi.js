const exp = require('express');
const expressAsncHandler = require('express-async-handler');
const bodyParser = require('body-parser')
const studentAssign = exp.Router();
studentAssign.use(exp.json());

//middle wares
studentAssign.use(bodyParser.urlencoded({ extended: false }))

// Handle the route for creating fields in the studentAssign collection


module.exports = studentAssign;
