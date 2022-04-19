const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const path = require("path");

const confessionRouter = require("./routes/confession");
const collegeRouter = require("./routes/college");
const sortRouter = require("./routes/sort");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/user", userRouter);
app.use("/confession", confessionRouter);
app.use("/college", collegeRouter);
app.use("/sort", sortRouter);

//DB Config
const url = process.env.MONGO_URI;
//Connect To DB
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED...");
    })
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log("Server running on port 8080");
});
