const express = require('express');

const router = express.Router();

const Schedule = require('../models/schedule');

router.get('/', (req, res) => {

    Schedule.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });

    // return;

});

router.post('/save', (req, res) => {
    console.log('Body : ', req.body);
    const data = req.body;

    const newSchedule = new Schedule(data);

    newSchedule.save((error) => {
        if(error){
            res.status(500).json({ msg : 'Sorry, internal server errors' });
        } else {
            res.json({
                msg: "Data has been saved !!"
            });
        }
    })

    // return;

});

router.put('/edit', (req, res) => {
    console.log('Body : ', req.body);
    const data = req.body;
    console.log(data.Id);
    let key = {"Id": data.Id};
    let value = {$set: req.body };
    Schedule.updateOne(key, value)
        .then(() => {
            res.json({
                msg: "Data has been edited !!"
            });
            console.log("Success ...");
        })
        .catch((error) => {
            console.log('Error: ', error);
        });

    // return;
});

router.put('/delete', (req, res) => {
    // console.log("hello");
    console.log('Body : ', req.body);
    const data = req.body;
    console.log(data.Id);
    Schedule.deleteOne({ "Id": data.Id})
    .then(() => {
        res.json({
            msg: "Data has been deleted !!"
        });
        console.log("Success ...");
    })
    .catch((error) => {
        console.log('Error: ', error);
    });
    // return;
});

router.get('/name', (req, res) => {
    const data = {
        username : 'viraj',
        age : 20
    };
    res.json(data);
});

module.exports = router;