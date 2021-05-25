import axios = require("axios");
import https = require("https");
import primeInterfaces = require("./primeInterfaces");
import globalVariables = require("../varmanager");

const httpClient = axios.default;
const vars = globalVariables.default;

let URL: String = "";

if (vars.isSSL) {
  URL = "https://" + vars.server + "/webacs/api/v4/data/Devices.json";
} else {
  URL = "http://" + vars.server + "/webacs/api/v4/data/Devices.json";
}

// Allows SSL Verifaction Errors request level
const agent = new https.Agent({
  rejectUnauthorized: false,
});

function getDevices(reachability: string) {
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
        var response: primeInterfaces.primeReachabilityResponse =
          res.data.queryResponse;
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getDeviceDetails(device: primeInterfaces.reachabilityEntityId) {
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
        var device: primeInterfaces.Entity = res.data.queryResponse.entity;
        resolve(device);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getPrimeResponse() {
  var finalResponse: primeInterfaces.primeResponse = new primeInterfaces.primeResponse();
  return new Promise((resolve, reject) => {
    getDevices("REACHABLE")
      .then((reachableResponse: primeInterfaces.primeReachabilityResponse) => {
        finalResponse.reachable = reachableResponse;
        getDevices("UNREACHABLE")
          .then(
            (
              unreachableResponse: primeInterfaces.primeReachabilityResponse
            ) => {
              finalResponse.unreachable = unreachableResponse;
              if (finalResponse.unreachable["@count"]) {
                finalResponse.unreachableDevices = new Array();
                //console.log(unreachableResponse.entityId);
                var promises = [];
                finalResponse.unreachable.entityId.forEach(
                  (id: primeInterfaces.reachabilityEntityId) => {
                    promises.push(
                      getDeviceDetails(id).then(
                        (res: primeInterfaces.Entity) => {
                          finalResponse.unreachableDevices.push(
                            res[0].devicesDTO
                          );
                        }
                      )
                    );
                  }
                );
                Promise.all(promises).then(() => {
                  resolve(finalResponse);
                });
              } else {
                resolve(finalResponse);
              }
            }
          )
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
