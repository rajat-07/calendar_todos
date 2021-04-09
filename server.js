const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// user - rajat, password - Unergia1234
const MONGODB_URI = 'mongodb+srv://rajat:Unergia1234@eventsdb.wkbbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(MONGODB_URI || 'mongodb://localhost/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//// deployment stuff ////

// mongoose.connect(process.env.MONGODB_URI , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

//// deployment stuff ////

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});

// data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// "Id": 1,
// "Subject": "Explosion of Betelgeuse Star",
// "Location": "Space Centre USA",
// "StartTime": "2019-01-06T04:00:00.000Z",
// "EndTime": "2019-01-06T05:30:00.000Z",
// "CategoryColor": "#1aaa55"
// Schema
// const Schema = mongoose.Schema;
// const ScheduleSchema = new Schema({
//     Id: Number,
//     Subject: String,
//     Location: String,
//     StartTime: { type: Date, default: Date.now },
//     EndTime: { type: Date, default: Date.now },
//     CategoryColor: String
// });

// // Model
// const Schedule = mongoose.model('Schedule', ScheduleSchema);

// Saving data to our mongo database
// const data = {
//     Id: 1,
//     Subject: "Explosion of Betelgeuse Star",
//     Location: "Space Centre USA",
//     StartTime: "2019-01-06T04:00:00.000Z",
//     EndTime: "2019-01-06T05:30:00.000Z",
//     CategoryColor: "#1aaa55"
// };

// instance of the model
// const newSchedule = new Schedule(data);

// newSchedule.save((error) => {
//     if(error) {
//         console.log('Oops, something happened');
//     } else {
//         console.log('Data has been saved');
//     }
// });

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);


//// deployment stuff ////

if(process.env.NODE_ENV === 'production'){
    //set static folder
    // app.use(express.static('client/build'));

    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

// app.get('*',(req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

//// deployment stuff ////

app.listen(PORT, console.log(`Server is starting at ${PORT}`));



