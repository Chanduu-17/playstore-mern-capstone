const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');
const App = require('./src/models/App');

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const beautyApp = await App.findOne({ name: /Beauty Studio/i });
        if (!beautyApp) {
            console.log('Beauty Studio app not found');
            return;
        }
        console.log(`Beauty Studio ID: ${beautyApp._id}`);

        const allUsers = await User.find();
        console.log(`Total users: ${allUsers.length}`);
        allUsers.forEach(u => {
            const hasApp = u.downloadedApps.map(id => id.toString()).includes(beautyApp._id.toString());
            console.log(`User: ${u.name} (${u.role}) - Has App: ${hasApp} - Downloads: [${u.downloadedApps.join(', ')}]`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}
check();
