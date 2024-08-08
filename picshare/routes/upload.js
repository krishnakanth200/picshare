const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

const storage = multer.diskStorage({
    destination: (req, file, calb) => calb(null, 'public/images'),
    filename: (req, file, calb) => calb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/', (req, res) => {
    res.render('upload');
});

router.post('/', upload.single('image'), [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .custom(value => {
            const wordCount = value.split(/\s+/).length;
            if (wordCount < 1 || wordCount > 400) {
                throw new Error('Description must be between 1 and 400 words');
            }
            return true;
        })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('upload', { errors: errors.array() });
    }

    const photo = new Photo({
        title: req.body.title,
        description: req.body.description,
        imageUrl: `/images/${req.file.filename}`
    });

    await photo.save();
    res.redirect('/');
});

module.exports = router;
