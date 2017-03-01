let schedule = require('../lib/daySchedule');

/**
 * Schedule a Single function multiple times during a day
 */

console.log("--- BASIC TEST ---")

var scheduledEvent = schedule.daySchedule({
    startDay: new Date(),
    startHour: 0,
    endHour: 24,
    nTimesPerDay: 24,
    nDays: 1
}, function MyFunction (scheduledDate) {
    console.log(scheduledDate);
});


// scheduledEvent is the list of scheduled tasks (only 1 in this case)
for(let i in scheduledEvent){
    console.log("Date: " + scheduledEvent[i].date.toString() + " - FunName: "+ scheduledEvent[i].functionName);
}
