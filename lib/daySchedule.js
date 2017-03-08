let schedule = require('node-schedule'),
    extend = require('deep-extend');

module.exports.getScheduledList = getScheduledList;
module.exports.daySchedule = daySchedule;

function daySchedule(options, callback) {

    this.options = extend({
        startDay: new Date(),
        startHour: 0,
        endHour: 24,
        nTimesPerDay: 24,
        nDays: 1
    }, options);

    let startDay = options.startDay;
    let startHour = options.startHour;
    let endHour = options.endHour;
    let nTimesPerDay = options.nTimesPerDay;
    let nDays = options.nDays;

    let roundCallback = [];
    if (typeof callback === "function") {
        roundCallback = [callback];
    } else {
        checkAllAreFunctions(callback);
        roundCallback = callback;
    }

    let times = getScheduledList(startDay, startHour, endHour, nTimesPerDay, nDays);

    let cbIndex = 0;
    let ret = [];
    for (let i in times) {
        let currInd = cbIndex++ % roundCallback.length;
        schedule.scheduleJob(times[i], function theCallback(cb, theTime) {
            cb(theTime);
        }.bind(null, roundCallback[currInd], times[i]));
        ret[i] = {
            date: times[i],
            functionName: roundCallback[currInd].name
        }
    }

    return ret;
};

function checkAllAreFunctions(functions) {
    if (!Array.isArray(functions)) {
        throw new Error("Callback should be a function or an array of functions");
    }
}

function getScheduledList(startDay, startHour, endHour, nTimes, nDays) {

    let minutesInterval = Math.floor((endHour - startHour) * 60 / nTimes);

    let theDay = new Date(startDay);
    theDay.setHours(0, 0, 0, 0);
    theDay.setHours(startHour);

    let scheduledList = [];
    for (let d = 0; d < nDays; d++) {

        let day = addDays(theDay, d);
        let startMinute = randomIntFromInterval(0, minutesInterval);
        let startDate = addMinutes(day, startMinute);

        for (let t = 0; t < nTimes; t++) {
            let actualDate = addMinutes(startDate, t * minutesInterval);
            scheduledList.push(actualDate);
        }
    }

    return scheduledList;
};


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}