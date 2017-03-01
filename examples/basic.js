let schedule = require('../lib/daySchedule');

/**
 * Schedule a Single function multiple times during a day
 */

console.log("--- BASIC TEST: Single Function in a day---")

let scheduledEvent = schedule.daySchedule({
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


/**
 * Schedule a Single function multiple times during a day
 */
console.log();
console.log("--- BASIC TEST: Multiple Function in a day---")

let scheduledEvent2 = schedule.daySchedule({
    startDay: new Date(),
    startHour: 0,
    endHour: 24,
    nTimesPerDay: 24,
    nDays: 1
}, [function MyFunction1 (scheduledDate) {
    console.log("My Function1 executed");
}, function AnotherFunction(scheduledDate){
    console.log("Another Function executed");
}]);


// scheduledEvent is the list of scheduled tasks (only 1 in this case)
for(let i in scheduledEvent2){
    console.log("Date: " + scheduledEvent2[i].date.toString() + " - FunName: "+ scheduledEvent2[i].functionName);
}