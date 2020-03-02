function createEmployeeRecord(sourceArray) {
    return {
        firstName: sourceArray[0],
        familyName: sourceArray[1],
        title: sourceArray[2],
        payPerHour: sourceArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(sourceArray) {
    return sourceArray.map(element => createEmployeeRecord(element))
}

function createTimeInEvent(employeeRecord, timestampString) {
    let hourNum = timestampString.slice(-4)
    let dateNum = timestampString.slice(0, 10)

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hourNum),
        date: dateNum
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timestampString) {
    let hourNum = timestampString.slice(-4)
    let dateNum = timestampString.slice(0, 10)

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hourNum),
        date: dateNum
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, datestampString) {
    let timeIn = employeeRecord.timeInEvents.find(function(e) {
        return e.date === datestampString
    })
    let timeOut = employeeRecord.timeOutEvents.find(function(e) {
        return e.date === datestampString
    })
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, datestampString) {
    return hoursWorkedOnDate(employeeRecord, datestampString) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let total = 0
    employeeRecord.timeInEvents.forEach(element => {
        let dateString = element.date
        total += wagesEarnedOnDate(employeeRecord, dateString)
    })
    return total
}

function calculatePayroll(sourceArray) {
    return sourceArray.reduce(function(total, element) {
        return allWagesFor(element) + total
    }, 0)
}

function findEmployeeByFirstName(sourceArray, fName) {
    return sourceArray.find(function(element) {
        return fName === element.firstName
    })
}