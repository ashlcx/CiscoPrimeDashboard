var apiURL = window.location.href + "api";
var refreshDuration = 5000;
var ciscoPrimeUp = false;
var domContainsData = false

function updateValues() {
    fetch(apiURL).then(response => response.text()).then((res) => {
        // TODO LOADING SCREEN
        var primeResponse = JSON.parse(res);
        if (primeResponse.Error) {
            throw "ERROR OCCURED"
        } else {
            ciscoPrimeUp = true
            domContainsData = true
            // TODO toggle status icon 
        }
        document.getElementById("title").innerHTML = "";
        document.getElementById("reachable").innerHTML = "Reachable devices = " + primeResponse.reachable['@count']; 
        if (primeResponse.unreachableDevices) {
            document.getElementById("unreachable").innerHTML = "unreachable devices = " + primeResponse.unreachable['@count'] + "<br>Unreachable Devices:<ul>";
            primeResponse.unreachableDevices.forEach((device) => {
                document.getElementById("unreachable").innerHTML += "<li>" + device.deviceName + "</li>";
            });
            
        }
        document.getElementById("unreachable").innerHTML += "</ul>";
    }).catch((err) => {
        if (err === "ERROR OCCURED") {
            console.log("Could not connect to Cisco Prime");
            document.getElementById("title").innerHTML = "Could not connect to cisco prime";
        } else {
            console.log("Unexpected Error occured");
            document.getElementById("title").innerHTML = err;
        }        
    })
}

setInterval(updateValues, refreshDuration)

updateValues();