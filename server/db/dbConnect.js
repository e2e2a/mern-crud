const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try {
        const conn = mongoose.connect('mongodb://127.0.0.1/mern');
        console.log('database connected')
        return conn;
    } catch (error) {
        console.log('db err:', error)
    }
}
module.exports = dbConnect