const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { email, password } = req.body;
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
        res.status(400).json({ error: 'Не вдалося зареєструвати користувача' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неправильні облікові дані' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильні облікові дані' });
        }
        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token, userId: user._id, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});


router.get('/me', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Авторизаційний токен не знайдено.' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Помилка отримання даних користувача.' });
    }
});

module.exports = router;
