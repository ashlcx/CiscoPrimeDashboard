import axios = require('axios');
import https = require('https');
import primeInterfaces = require('./primeInterfaces');
const URL = "https://prime.corp.ashlcx.com/webacs/api/v4/data/Devices.json"

const httpClient = axios.default;

const uname = "API";
const pass = "gop.2kCs"

// At request level
const agent = new https.Agent({
    rejectUnauthorized: false
});


function getDevices(reachability: string) {
    return new Promise((resolve, reject) => {
        httpClient.get(URL + "?reachability=\"" + reachability + "\"", {
            httpsAgent: agent,
            auth: {
                username: uname,
                password: pass
            }
        }).then((res) => {
            var response: primeInterfaces.primeReachabilityResponse = res.data.queryResponse;
            //console.log(response);
            resolve(response);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });

}


export function getPrimeResponse() {

    var finalResponse: primeInterfaces.primeResponse = new primeInterfaces.primeResponse;


    return new Promise((resolve, reject) => {
        getDevices("REACHABLE").then((reachableResponse: primeInterfaces.primeReachabilityResponse) => {
            finalResponse.reachable = reachableResponse;
            getDevices("UNREACHABLE").then((unreachableResponse: primeInterfaces.primeReachabilityResponse) => {
                finalResponse.unreachable = unreachableResponse;
                resolve(finalResponse);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });;
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}