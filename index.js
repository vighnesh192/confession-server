const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/user', userRouter);

//DB Config
const url = process.env.MONGO_URI;
//Connect To DB
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("DB CONNECTED...")})
.catch((err) => console.log(err));

app.listen(port, () => {
    console.log('Server running on port 8080');
})