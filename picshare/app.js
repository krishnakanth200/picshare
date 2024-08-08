const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();

mongoose.connect('mongodb+srv://krishnakanthsubbisetty:kzOnXEQBSDpWVRtQ@cluster0.upxycbm.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join('public')));
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));
app.use('/upload', require('./routes/upload'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
