const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/user-routes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
// 🔒 Security middleware
app.use(helmet());
// 📊 Logging middleware
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Backend Setup Done!');
});

app.use('/api/users', userRoutes);


module.exports = app;
