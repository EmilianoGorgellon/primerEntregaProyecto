require("dotenv").config();

const config = {
    port: process.env.PORT,
    cors: process.env.CORS 
}

module.exports = {config};