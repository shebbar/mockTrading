const express = require('express');
const routes = require('./src/routes/routes');
const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request multi-part/form data
app.use(express.static('public'));
app.use(upload.array()); 

app.use('/', routes);

const cors = require('cors');
app.use(cors());

const db = require('./src/models/db');
//Initiate a db connection and start the app

const initApp = async () => {
    console.log("Testing the database connection..");
 
    // Test the connection.
    try {
       await db.sequelize.authenticate();
       console.log("Connection has been established successfully.");
       /**
        * Start the web server on the specified port.
        */
 
       app.listen(PORT, () => {
          console.log(`Server is running at: http://localhost:${PORT}`);
       });
    } catch (error) {
       console.error("Unable to connect to the database:", error);
    }
 };

 //Initialize the application
 initApp();
