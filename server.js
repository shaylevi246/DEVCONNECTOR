require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;

const connection_url = `mongodb+srv://${process.env.CONNECTION_USER}:${process.env.CONNECTION_PASSWORD}@devconnector.twvhe.mongodb.net/devconnectorDB?retryWrites=true&w=majority`;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => console.log(`connected to port: ${PORT}`));
