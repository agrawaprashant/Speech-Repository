const express = require("express");
const connectDb = require("./config/db");
var cors = require("cors");
const app = express();

app.use(cors());
//connect database
connectDb();
app.get("/", (req, res) => {
  res.send("API is running!");
});

//Init Middleware
app.use(express.json({ extended: false }));

//define routes
app.use("/api/speech", require("./routes/api/speech"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
