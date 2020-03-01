// Your code here
const createEmployeeRecord = array => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array [3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employees => {
    return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, timeStamp) => {
    const [date, time] = timeStamp.split(' ')
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

const createTimeOutEvent = (employee, timeStamp) => {
    const [date, time] = timeStamp.split(' ')
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

const hoursWorkedOnDate = (employee, soughtDate) => {
    const inDay = employee.timeInEvents.find(e => {
        return e.date === soughtDate
    })

    const out = employee.timeOutEvents.find(e => {
        return e.date === soughtDate
    })

    return (out.hour - inDay.hour) / 100
}

const wagesEarnedOnDate = (employee, date) => {
    const hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

const allWagesFor = employee => {
    let allWages = 0
    employee.timeInEvents.forEach(timeInEvent => {
        allWages += wagesEarnedOnDate(employee, timeInEvent.date) 
    })
    return allWages
}

const calculatePayroll = employees => {
    let payroll = 0
    employees.forEach(employee => {
        payroll += allWagesFor(employee)
    })
    return payroll
}

const findEmployeeByFirstName = (array, firstName) => {
    return array.find(employee => employee.firstName === firstName)
}