const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.info('DB online!');
    } catch (error) {
        console.error(error);
        throw new Error('Error trying to connect to mongo db')
    }
}

module.exports = {
    dbConnection,
};
