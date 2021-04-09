const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    Id: Number,
    Subject: String,
    EventType: String,
    StartTime: { type: Date, default: Date.now },
    EndTime: { type: Date, default: Date.now },
    CategoryColor: String
});

// Model
const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;