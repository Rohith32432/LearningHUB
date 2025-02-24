const mongoose = require('mongoose');

async function connection() {
    try {
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/learning-hub');
        // con.on('connected', () => {
        //     console.log('Connected to DB');
        // });
        
        // con.on('disconnected', () => {
        //     console.log('Disconnected from MongoDB');
        // });
        console.log('db connected');
        
    } catch (err) {
        console.log('Error occurred:' + err);
    }
}

module.exports = { connection };
