const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //helps up connect to mongodb

require("dotenv").config();

const app = express();
const port = process.env.Port || 5000;

const uri = process.env.ATLAS_URI;

//pass in mongoDB connection string, dont worry about flags they just there for some deprecated jawns
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

app.use(cors());
app.use(express.json()); //allows us to parse json

const donorsRouter = require("./routes/donors");

app.use("/donors", donorsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); //starts server
