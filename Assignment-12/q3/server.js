const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 3000;


app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));




app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});


app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(user);
});


app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});