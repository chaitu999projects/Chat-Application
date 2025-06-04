const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', authRoutes);
app.use('/messages', messageRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Initialize data files if they don't exist
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const usersFile = path.join(dataDir, 'users.json');
const messagesFile = path.join(dataDir, 'messages.json');

if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]');
}

if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, '[]');
}