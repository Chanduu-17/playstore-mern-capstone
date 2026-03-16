const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const App = require('./src/models/App');
const Notification = require('./src/models/Notification');

async function debugState() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('--- Database State Debug ---');

        const users = await User.find();
        console.log(`Total Users: ${users.length}`);
        users.forEach(u => {
            console.log(`User: ${u.name} (${u.email}) - Role: ${u.role} - Downloads: ${u.downloadedApps.length}`);
        });

        const apps = await App.find().populate('owner', 'name');
        console.log(`\nTotal Apps: ${apps.length}`);
        apps.forEach(a => {
            console.log(`App: ${a.name} (ID: ${a._id}) - Owner: ${a.owner ? a.owner.name : 'Unknown'} - Download Count: ${a.downloadCount}`);
        });

        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
        console.log(`\nLatest Notifications: ${notifications.length}`);
        notifications.forEach(n => {
            console.log(`Notification: ${n.title} - To: ${n.user} - Type: ${n.type} - CreatedAt: ${n.createdAt}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

debugState();
