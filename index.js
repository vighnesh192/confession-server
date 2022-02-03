const express = require('express');
const userRouter = require('./routes/user');

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/user', userRouter);

app.listen(port, () => {
    console.log('Server running on port 8080');
})