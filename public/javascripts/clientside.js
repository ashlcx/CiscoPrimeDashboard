var apiURL = window.location.href + "api";
var refreshDuration = 5;
var secondsRemaining = 5;
var timerInterval;
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

//set the cisco prime is up status on the navbar
const statusDown = "<a class=\"btn btn-danger btn-sm\"><i class=\"far fa-times-circle\"></i></a >"
const statusUp = "<a class=\"btn btn-success btn-sm\"><i class=\"fas fa-check-circle\"></i></a >"

function updateValues() {
    fetch(apiURL).then(response => response.text()).then((res) => {
        //parse string to an object
        var primeResponse = JSON.parse(res);
        //checks to see if the API pushes an error and throw if so
        if (primeResponse.Error) {
            throw "ERROR OCCURED"
        }
        var unreachablePercentage;
        var totalDevices = primeResponse.reachable['@count'] + primeResponse.unreachable['@count'];
        var amountInMaint = 0;

        //Clear all errors and set everything to green
        document.getElementById("status-button").innerHTML = statusUp;
        document.getElementById("loader").style.display = "none";
        document.getElementById("error-message").innerHTML = "";
        document.getElementById("error-message").style.display = "none";

        //check if any unreachable devices - if not only display the cardbox
        if (primeResponse.unreachableDevices) {
            document.getElementById("unreachableList").innerHTML = "Unreachable Devices: ";
            primeResponse.unreachableDevices.sort(sortDownDevices("deviceName"));
            primeResponse.unreachableDevices.forEach((device) => {
                if (device.managementStatus === "INSERVICE_MAINTENANCE") {
                    document.getElementById("unreachableList").innerHTML += "<div class=\"alert alert-warning device\">" + device.deviceName + "</div>";
                    amountInMaint += 1;
                } else {
                    document.getElementById("unreachableList").innerHTML += "<div class=\"alert alert-danger device\">" + device.deviceName + "</div>";
                }
            });
            //Set cardbox numbers
            document.getElementById("totalNumber").innerHTML = totalDevices;
            document.getElementById("upNumber").innerHTML = primeResponse.reachable['@count'];
            document.getElementById("maintNumber").innerHTML = amountInMaint;
            document.getElementById("downNumber").innerHTML = primeResponse.unreachable['@count'] - amountInMaint;
            // Set progress bar numbers
            unreachablePercentage = (primeResponse.unreachable['@count'] - amountInMaint) / totalDevices * 100;
            document.getElementById("progress-down").style.width = unreachablePercentage + "%";
            document.getElementById("progress-maint").style.width = (amountInMaint / totalDevices * 100) + "%";
            document.getElementById("progress-up").style.width = (primeResponse.reachable['@count'] / totalDevices * 100) + "%";
            $('progress-down').attr("aria-valuenow", unreachablePercentage)
            $('progress-up').attr("aria-valuenow", (primeResponse.reachable['@count'] / totalDevices * 100))
            $('progress-maint').attr("aria-valuenow", (amountInMaint / totalDevices * 100))
        } else {
            // if no unreachables clear the unreachable list and set progress up to 100%
            document.getElementById("unreachableList").innerHTML = "";
            document.getElementById("progress-up").style.width = "100%"
            document.getElementById("progress-maint").style.width = "0%"
            document.getElementById("progress-down").style.width = "0%"
            $('progress-up').attr("aria-valuenow", 100)
            $('progress-down').attr("aria-valuenow", 0)
            $('progress-maint').attr("aria-valuenow", 0)
        }
    }).catch((err) => {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("loader").style.display = "block";
        if (err === "ERROR OCCURED") {
            document.getElementById("error-message").innerHTML = "Could not connect to cisco prime";
        } else {
            document.getElementById("error-message").innerHTML = err;
        }
        document.getElementById("status-button").innerHTML = statusDown;
    })
}

// @param string
// sorts an array based off its property
function sortDownDevices(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

//starts and clears the refresh loop for refresh time change
function startRefreshLoop() {
    secondsRemaining = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        updateTimerValues();
        secondsRemaining--;
        if (secondsRemaining <= 0) {
            updateValues();
            secondsRemaining = refreshDuration
        }
    }, 1000)
}

function setVariables() {
    if (isChrome) {
        document.getElementById("memory").innerHTML = "Memory Usage: "
    }

    if (variables.title) {
        document.getElementById("company").innerHTML = variables.title;
        document.title = variables.title
    }
}

function updateTimerValues() {
    document.getElementById("seconds-remaining").innerHTML = secondsRemaining + " s";
    
    if (isChrome) {
        if (window.performance.memory.usedJSHeapSize < 1024) {
            document.getElementById("memory-usage").innerHTML = parseInt(window.performance.memory.usedJSHeapSize) + "B";
        } else if (window.performance.memory.usedJSHeapSize < (1024 * 1024)) {
            document.getElementById("memory-usage").innerHTML = parseInt(window.performance.memory.usedJSHeapSize / 1024) + "KB";
        } else if (window.performance.memory.usedJSHeapSize < (1024 * 1024 * 1024)) {
            document.getElementById("memory-usage").innerHTML = parseInt(window.performance.memory.usedJSHeapSize / (1024 * 1024)) + "MB";
        }
        
    }
}



// SCRIPT STARTS HERE
setVariables();
startRefreshLoop();
updateValues();