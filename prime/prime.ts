import axios = require('axios');
import https = require('https');
import primeInterfaces = require('./primeInterfaces');
import promiseForeach = require('promise-foreach');
const URL = "https://prime.corp.ashlcx.com/webacs/api/v4/data/Devices.json"

const httpClient = axios.default;



//const uname = "root";
//const pass = "Famas!123123"

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
            resolve(response);
        }).catch((err) => {
            reject(err);
        });
    });

}

export function getDeviceDetails(device: primeInterfaces.reachabilityEntityId) {
    return new Promise((resolve, reject) => {
        httpClient.get(device["@url"] + ".json", {
            httpsAgent: agent,
            auth: {
                username: uname,
                password: pass
            }
        }).then((res) => {
            var device: primeInterfaces.Entity = res.data.queryResponse.entity;
            //console.log(device);
            resolve(device);
        }).catch((err) => {
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
                if (finalResponse.unreachable["@count"]) {
                    finalResponse.unreachableDevices = new Array;
                    //console.log(unreachableResponse.entityId);
                    var promises = [];

                    finalResponse.unreachable.entityId.forEach((id: primeInterfaces.reachabilityEntityId) => {
                        promises.push(
                            getDeviceDetails(id).then((res: primeInterfaces.Entity) => {
                                finalResponse.unreachableDevices.push(res[0].devicesDTO)
                        }));
                    });

                    Promise.all(promises).then(() => {
                        resolve(finalResponse)
                    });

                } else {
                    resolve(finalResponse)
                }
            }).catch((err) => {
                //console.log(err);
                reject(err);
            });;
        }).catch((err) => {
            //console.log(err);
            reject(err);
        });
    });
}

