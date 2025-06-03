require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const countryRoutes = require('./routes/countryRoutes');


// express app
const app = express();

// middleware

app.use(cors());
app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/countries', countryRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Pasifika GET request')
});

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
});

