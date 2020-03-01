// Your code here
function createEmployeeRecord(array){
    const record = {};
    record.firstName = array[0];
    record.familyName = array[1];
    record.title = array[2];
    record.payPerHour = array[3];
    record.timeInEvents = [];
    record.timeOutEvents = [];

    return record
}

function createEmployeeRecords(AoA){
    return AoA.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(employee, date){
    const day = date.split(" ")[0];
    const hour = parseInt(date.split(" ")[1]);
    const obj = {};
    obj.type = "TimeIn";
    obj.date = day;
    obj.hour = hour;
    employee.timeInEvents.push(obj)
    return employee
}

function createTimeOutEvent(employee, date){
    const day = date.split(" ")[0];
    const hour = parseInt(date.split(" ")[1]);
    const obj = {};
    obj.type = "TimeOut";
    obj.date = day;
    obj.hour = hour;
    employee.timeOutEvents.push(obj)
    return employee
}

function hoursWorkedOnDate(employee, date){
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, date){
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}