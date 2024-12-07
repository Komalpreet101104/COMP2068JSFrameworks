
require("dotenv").config();
const configurations={
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB}
    }
module.exports = configurations;