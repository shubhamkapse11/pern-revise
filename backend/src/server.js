const dotenv = require('dotenv');
dotenv.config();
const prisma = require('./config/prisma');

const app = require('./app');

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

prisma.$connect()
    .then(() => console.log("DB Connected Done"))
    .catch(err => console.log("Error connecting to DB: ", err));