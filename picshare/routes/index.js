const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving photos from the database.");
    }
});
router.post('/delete/:id', async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error in deleting  photo.");
    }
});
module.exports = router;
