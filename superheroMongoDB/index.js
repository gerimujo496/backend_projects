const express = require("express");
const superheroes = require("./routes/superheros");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost/playgroud")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("couldnot connect"));
  
  
app.use(express.json());
app.use("/api/superheros", superheroes);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
