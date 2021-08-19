const express = require('express');                   //reference to express
const mongoose = require('mongoose');                 //reference to mongoose (installed package)
const bodyParser = require('body-parser');

const app = express();                                //using / executing express

if(process.env.ENV === 'Test'){
    console.log('This is a Test!');
    const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
    console.log('!!! This is for real !!!')
    const db = mongoose.connect('mongodb://localhost/bookAPI');
}


const port = process.env.PORT || 3000;                //setting up port to listen on
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res)=>{                           //everytime I get a GET-Request to '/' -> respond with a function
    res.send('Welcome to my Nodemon API!');     //this function has two variables past into (req = request /
})                                                   //res = respond)


app.server = app.listen(port, ()=>{
    console.log(`Running on port ${port}`);          //listening to port X
});

module.exports = app;