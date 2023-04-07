require('dotenv').config()

var PORT = process.env.PORT
var MONGODB_URI = process.env.MONGODB_URI

module.exports = {
    MONGODB_URI,
    PORT
}