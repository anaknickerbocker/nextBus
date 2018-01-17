// Dependencies
const fetch = require('node-fetch')
const Moment = require('moment')

// Global variables
var busRoute = process.argv[2]
var busStopName = process.argv[3]
var direction = process.argv[4]
var foundRoute
var foundDirection
var foundBusStop
if (direction) {
  direction = direction.toUpperCase()
}

// Start by checking that the bus stop exists
if (busRoute && busStopName && direction) {
  checkBusRoute()
} else {
  console.log('Please enter all 3 required parameters: (1) Bus Route, (2) Bus Stop Name, and (3) Direction')
}

function checkBusRoute () {
  fetch(`https://svc.metrotransit.org/NexTrip/Routes?format=json`)
    .then(response => response.json())
    .then(handleSuccess)
    .catch(e => requestError(e, 'Bus Route Request Error'))
    .then(checkDirection)
}

function handleSuccess (data) {
  try {
    var route = data.find(function (item) {
      return item.Description === busRoute
    })
    if (route) {
      foundRoute = route.Route
    } else {
      throw new Error('Route not found. Please try again.')
    }
  } catch (e) {
    console.log(e)
  }
}

function checkDirection () {
  if (foundRoute) {
    fetch('https://svc.metrotransit.org/NexTrip/Directions/' + foundRoute + '?format=json')
    .then(response => response.json())
    .then(handleDirectionSuccess)
    .catch(e => requestError(e, 'Direction Request Error'))
    .then(checkBusStopName)
  }
}

function handleDirectionSuccess (data) {
  try {
    for (var dir in data) {
      if (data[dir].Text.includes(direction)) {
        foundDirection = data[dir].Value
      }
    }
    if (!foundDirection) {
      throw new Error('Direction not found. Please try again.')
    }
  } catch (e) {
    console.log(e)
  }
}

function checkBusStopName () {
  if (foundRoute && foundDirection) {
    fetch('https://svc.metrotransit.org/NexTrip/Stops/' + foundRoute + '/' + foundDirection + '?format=json')
    .then(response => response.json())
    .then(handleBusStopNameSuccess)
    .catch(e => requestError(e, 'Bus Stop Name Request Error'))
    .then(getDepartureTimes)
  }
}

function handleBusStopNameSuccess (data) {
  try {
    for (var busStop in data) {
      if (data[busStop].Text.includes(busStopName)) {
        foundBusStop = data[busStop].Value
      }
    }
    if (!foundBusStop) {
      throw new Error('Bus stop not found. Please try again.')
    }
  } catch (e) {
    console.log(e)
  }
}

function getDepartureTimes () {
  if (foundRoute && foundDirection && foundBusStop) {
    fetch('https://svc.metrotransit.org/NexTrip/' + foundRoute + '/' + foundDirection + '/' + foundBusStop + '?format=json')
    .then(response => response.json())
    .then(departureTimesSuccess)
    .catch(e => requestError(e, 'departure times'))
  }
}

function departureTimesSuccess (data) {
  if (data[0].Actual) {
    console.log(data[0].DepartureText.replace('Min', 'minutes'))
  } else {
    Moment.relativeTimeThreshold('m', 60)
    var duration = new Moment(data[0].DepartureTime).fromNow()
    console.log(duration.substring(3, duration.length))
  }
}

function requestError (e) {
  console.log(e)
}
