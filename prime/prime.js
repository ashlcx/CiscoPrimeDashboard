"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrimeResponse = exports.getDeviceDetails = void 0;
const axios = require("axios");
const https = require("https");
const primeInterfaces = require("./primeInterfaces");
const globalVariables = require("../varmanager");
const httpClient = axios.default;
const vars = globalVariables.default;
let URL = "";
if (vars.isSSL) {
    URL = "https://" + vars.server + "/webacs/api/v4/data/Devices.json";
}
else {
    URL = "http://" + vars.server + "/webacs/api/v4/data/Devices.json";
}
// Allows SSL Verifaction Errors request level
const agent = new https.Agent({
    rejectUnauthorized: false,
});
function getDevices(reachability) {
    return new Promise((resolve, reject) => {
        httpClient
            .get(URL + '?reachability="' + reachability + '"', {
            httpsAgent: agent,
            auth: {
                username: vars.username,
                password: vars.password,
            },
        })
            .then((res) => {
            var response = res.data.queryResponse;
            resolve(response);
        })
            .catch((err) => {
            reject(err);
        });
    });
}
function getDeviceDetails(device) {
    return new Promise((resolve, reject) => {
        httpClient
            .get(device["@url"] + ".json", {
            httpsAgent: agent,
            auth: {
                username: vars.username,
                password: vars.password,
            },
        })
            .then((res) => {
            var device = res.data.queryResponse.entity;
            resolve(device);
        })
            .catch((err) => {
            reject(err);
        });
    });
}
exports.getDeviceDetails = getDeviceDetails;
function getPrimeResponse() {
    var finalResponse = new primeInterfaces.primeResponse();
    return new Promise((resolve, reject) => {
        getDevices("REACHABLE")
            .then((reachableResponse) => {
            finalResponse.reachable = reachableResponse;
            getDevices("UNREACHABLE")
                .then((unreachableResponse) => {
                finalResponse.unreachable = unreachableResponse;
                if (finalResponse.unreachable["@count"]) {
                    finalResponse.unreachableDevices = new Array();
                    //console.log(unreachableResponse.entityId);
                    var promises = [];
                    finalResponse.unreachable.entityId.forEach((id) => {
                        promises.push(getDeviceDetails(id).then((res) => {
                            finalResponse.unreachableDevices.push(res[0].devicesDTO);
                        }));
                    });
                    Promise.all(promises).then(() => {
                        resolve(finalResponse);
                    });
                }
                else {
                    resolve(finalResponse);
                }
            })
                .catch((err) => {
                reject(err);
            });
        })
            .catch((err) => {
            reject(err);
        });
    });
}
exports.getPrimeResponse = getPrimeResponse;
//# sourceMappingURL=prime.js.map