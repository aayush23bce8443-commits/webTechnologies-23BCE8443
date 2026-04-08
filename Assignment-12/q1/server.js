const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});