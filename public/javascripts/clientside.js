var apiURL = window.location.href + "api";
var refreshDuration = 5000;

function updateValues() {
    fetch(apiURL).then(response => response.text()).then((res) => {
        //console.log(res);
        var primeResponse = JSON.parse(res);
        //console.log(primeResponse);
        document.getElementById("title").innerHTML = "Cisco Prime All Good!!";
        document.getElementById("reachable").innerHTML = "Reachable devices = " + primeResponse.reachable['@count']; 
        document.getElementById("unreachable").innerHTML = "unreachable devices = " + primeResponse.unreachable['@count']; 
        if (primeResponse.unreachableDevices) {
            primeResponse.unreachableDevices.forEach((device) => {
                //document.getElementById("unreachable").innerHTML +=
                console.log(device)
            });
            
        }
    })
}

setInterval(updateValues, refreshDuration)

updateValues();