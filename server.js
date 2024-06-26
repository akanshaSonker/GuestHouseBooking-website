const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/feedbackDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for feedback
const feedbackSchema = new mongoose.Schema({
    city: String,
    issue: String,
    feedback: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/submit-feedback', async (req, res) => {
    const { city, issue, feedback } = req.body;

    console.log('Received feedback submission:', { city, issue, feedback });

    if (!city || !issue || !feedback) {
        console.error('Validation error: Missing fields');
        return res.status(400).send('All fields are required.');
    }

    try {
        const newFeedback = new Feedback({ city, issue, feedback });
        await newFeedback.save();
        console.log(`Feedback received from ${city}: ${issue} - ${feedback}`);
        res.status(200).send('Feedback submitted successfully.');
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('An error occurred while submitting feedback.');
    }
});

// Define a schema and model for booking
const bookingSchema = new mongoose.Schema({
    city: String,
    date: Date
});

const Booking = mongoose.model('Booking', bookingSchema);

app.post('/submit-booking', async (req, res) => {
    const { city } = req.body;

    console.log('Received booking submission:', { city });

    if (!city) {
        console.error('Validation error: Missing fields');
        return res.status(400).send('City is required.');
    }

    try {
        const newBooking = new Booking({ city, date: new Date() });
        await newBooking.save();
        console.log(`Booking received for ${city}`);
        res.status(200).send('Booking submitted successfully.');
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('An error occurred while submitting booking.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
