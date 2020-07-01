var apiURL = window.location.href + "api";
var refreshDuration = 5000;

function updateValues() {
    fetch(apiURL).then(response => response.text()).then((res) => {
        //console.log(res);
        var primeResponse = JSON.parse(res);
        //console.log(primeResponse);
        document.getElementById("title").innerHTML = "<h2>Cisco Prime Monitoring Dashboard</h2>";
        document.getElementById("reachable").innerHTML = "Reachable devices = " + primeResponse.reachable['@count']; 
        document.getElementById("unreachable").innerHTML = "unreachable devices = " + primeResponse.unreachable['@count'] + "<br>Unreachable Devices:<ul>";
        if (primeResponse.unreachableDevices) {
            primeResponse.unreachableDevices.forEach((device) => {
                document.getElementById("unreachable").innerHTML += "<li>" + device.deviceName + "</li>";
                console.log(device)
            });
            
        }
        document.getElementById("unreachable").innerHTML += "</ul>";
    })
}

setInterval(updateValues, refreshDuration)

updateValues();