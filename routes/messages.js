const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const MESSAGES_FILE = path.join(__dirname, '../data/messages.json');

// Get all messages
router.get('/', (req, res) => {
    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
        res.json(messages);
    } catch (err) {
        console.error('Error reading messages:', err);
        res.status(500).json({ error: 'Failed to load messages' });
    }
});

// Add new message
router.post('/', (req, res) => {
    const { username, message } = req.body;
    
    if (!username || !message) {
        return res.status(400).json({ error: 'Username and message are required' });
    }

    try {
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE));
        const newMessage = {
            username,
            message,
        };
        
        messages.push(newMessage);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        
        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ error: 'Failed to save message' });
    }
});

module.exports = router;