const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Helper: Read Users from JSON
const readUsers = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
};

// Helper: Write Users to JSON
const writeUsers = (users) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };
