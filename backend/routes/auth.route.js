const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received registration data:', req.body); // Додано лог

    if (!email || !password) {
        return res.status(400).json({ message: 'Будь ласка, заповніть всі поля.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email вже зайнятий.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Користувач зареєстрований успішно' });
    } catch (error) {
        console.error('Registration error:', error); // Додано лог
        res.status(400).json({ error: 'Не вдалося зареєструвати користувача' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login data:', req.body); // Додано лог

    if (!email || !password) {
        return res.status(400).json({ message: 'Будь ласка, заповніть всі поля.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Невірні облікові дані' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Невірні облікові дані' });
        }

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id, email: user.email });
    } catch (error) {
        console.error('Login error:', error); // Додано лог
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

module.exports = router;
