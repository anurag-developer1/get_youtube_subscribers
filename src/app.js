
const express = require('express');
const app = express()
const cors=require('cors')
const path = require('path');
const Subscribers = require('./models/subscribers');


// Your code goes here

//Middlewares


//serve a static inex.html file for the root route explaining the users the available end points and how to use them along with the links.
app.use(express.static(path.join(__dirname, '/public')));

//cors middleware to allow cross origin resource sharing for all origins and methods.
app.use(cors());

//Routes
app.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscribers.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/subscribers/names', async (req, res) => {
    try {
        const subscribers = await Subscribers.find().select('name subscribedChannel -_id');
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/subscribers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        //find a subscriber by id by compaaring it with the entered id as the request param and remove all the " __v" fields from the returned document as it is not needed and will just clutter up the response body unnecessarily.
        const subscriber = await Subscribers.findById(id).select("-__v");
        
        //if the subscriber is not found, return a 400 error
        if (!subscriber) {
           res.status(400).json({ message: 'Subscriber not found' });
        }
         //send the subscriber document as a response
        else{res.status(200).json(subscriber);}
       
        
      } catch (error) {
        //Error handling
        console.error('Error fetching subscriber:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
});
















module.exports = app;
