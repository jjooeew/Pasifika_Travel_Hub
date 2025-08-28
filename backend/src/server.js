require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { attachUserIfPresent } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const mongoose = require("mongoose");

const countryRoutes = require("./routes/countryRoutes");
const activityRoutes = require("./routes/activityRoutes")

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");


// express app
const app = express();
// middleware
console.log('typeof errorHandler →', typeof errorHandler);
app.use(cors());
app.use(express.json());

app.use(attachUserIfPresent);

app.use("/api", countryRoutes);
app.use("/api", activityRoutes);


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);


app.use(errorHandler);


// routes
app.get("/", (req, res) => {
  res.send("Pasifika GET request");
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("db connected & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB error:", error);
  });
