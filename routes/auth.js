const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const USERS_FILE = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/login', (req, res) => {
    const { username } = req.body;
    
    if (!username || username.trim().length < 3) {
        return res.status(400).send('Username must be at least 3 characters');
    }

    try {
        const users = JSON.parse(fs.readFileSync(USERS_FILE));
        const cleanUsername = username.trim();
        
        if (!users.some(user => user.username === cleanUsername)) {
            users.push({ 
                username: cleanUsername,
            });
            fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        }

        res.redirect(`/chat.html?username=${encodeURIComponent(cleanUsername)}`);
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;