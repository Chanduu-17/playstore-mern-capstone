const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const App = require('./src/models/App');

async function testQuery() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/playstore');
        console.log('Connected to MongoDB');

        const testApp = await App.findOne();
        if (!testApp) {
            console.log('No apps found in DB to test with.');
            return;
        }

        const appIdStr = testApp._id.toString();
        const appIdObj = testApp._id;
        console.log(`Testing with App ID (string): "${appIdStr}"`);
        console.log(`Testing with App ID (ObjectId): ${appIdObj}`);

        const countStr = await User.countDocuments({ downloadedApps: appIdStr });
        console.log(`Users found using string: ${countStr}`);

        const countObj = await User.countDocuments({ downloadedApps: appIdObj });
        console.log(`Users found using ObjectId: ${countObj}`);

        const countUserFind = await User.find({ downloadedApps: appIdStr }).countDocuments();
        console.log(`User.find(...).countDocuments() using string: ${countUserFind}`);


    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

testQuery();
