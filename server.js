const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs=require('fs')
require("dotenv").config();
const path = require("path");

//import routes
const authRoutes = require("./routes/auth");
const port = process.env.PORT || 8000;
const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware

fs.readdirSync('./routes').map((r)=>app.use("/api",require("./routes/"+r)))
//port

//
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });

}


app.listen(port, () => console.log(`Server is running on port ${port}`));
