const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'API is running' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/apps', require('./routes/appRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use((req, res) =>
    res.status(404).json({ success: false, message: 'Route not found' })
);

app.use(require('./middleware/errorHandler'));

module.exports = app;