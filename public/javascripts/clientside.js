var apiURL = window.location.href + "api";
var refreshDuration = 5000;

const statusDown = "<a class=\"btn btn-danger btn-sm\"><i class=\"far fa-times-circle\"></i></a >"
const statusUp = "<a class=\"btn btn-success btn-sm\"><i class=\"fas fa-check-circle\"></i></a >"

function updateValues() {
    fetch(apiURL).then(response => response.text()).then((res) => {
        var primeResponse = JSON.parse(res);
        if (primeResponse.Error) {
            throw "ERROR OCCURED"
        } else {
            document.getElementById("status-button").innerHTML = statusUp;
            document.getElementById("loader").style.display = "none";
            document.getElementById("error-message").innerHTML = "";
            document.getElementById("error-message").style.display = "none";
        }
        document.getElementById("reachable").innerHTML = "Reachable devices = " + primeResponse.reachable['@count']; 
        if (primeResponse.unreachableDevices) {
            document.getElementById("unreachable").innerHTML = "unreachable devices = " + primeResponse.unreachable['@count'] + "<br>Unreachable Devices:<ul>";
            primeResponse.unreachableDevices.forEach((device) => {
                document.getElementById("unreachable").innerHTML += "<li>" + device.deviceName + "</li>";
            });      
        }
        document.getElementById("unreachable").innerHTML += "</ul>";
    }).catch((err) => {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("loader").style.display = "block";
        if (err === "ERROR OCCURED") {
            document.getElementById("error-message").innerHTML = "Could not connect to cisco prime";
        } else {
            console.log("Unexpected Error occured");
            document.getElementById("error-message").innerHTML = err;
        }        
        document.getElementById("status-button").innerHTML = statusDown;
    })
}

function startRefreshLoop() {
    clearInterval();
    setInterval(updateValues, refreshDuration)
}

// SCRIPT STARTS HERE
startRefreshLoop();
updateValues();