import express = require("express");

const app = express();
app.set("port", process.env.PORT || 8443);

app.get(
  "/webacs/api/v4/data/Devices.json",
  (req: express.Request, res: express.Response) => {
    console.log("CONNECTION for Devices");
    res.send({
      queryResponse: {
        "@rootUrl": "https://localhost:8443/webacs/api/v1/data",
        "@requestUrl":
          "https : //szier-m8-106.cisco.com/webacs/api/v1/data/Devices/42",
        "@responseType": "getEntity",
        entity: {
          "@url": "https://localhost:/webacs/api/v1/data/Devices/1",
          "@type": "Devices",
          "@dtoType": "devicesDTO",
          devicesDTO: {
            "@id": "1",
            "@displayName": "TestDevice.corp.local",
            clearedAlarms: 1,
            collectionDetail: "Collected",
            collectionTime: "2014-12-04T10 : 16 : 28.285-08 : 00",
            creationTime: "2014-12-04T10 : 16 : 28.285-08 : 00",
            criticalAlarms: 0,
            deviceId: 1,
            deviceName: "TestDevice.corp.local",
            deviceType: "Router",
            informationAlarms: 0,
            ipAddress: "192.168.1.1",
            location: "Strat",
            majorAlarms: 0,
            managementStatus: "MANAGED",
            manufacturerPartNrs: {
              manufacturerPartNr: "String value",
            },
            minorAlarms: 0,
            productFamily: "String value",
            reachability: "REACHABLE",
            softwareType: "IOS-XE",
            softwareVersion: "16.6.7",
            warningAlarms: 0,
          },
        },
      },
    });
  }
);

app.get(
  "/webacs/api/v1/data/Devices/1.json",
  (req: express.Request, res: express.Response) => {
    console.log("CONNECTION for Device 1");
    res.send({
      queryResponse: {
        "@rootUrl": "https://localhost:8443/webacs/api/v1/data",
        "@requestUrl":
          "https : //szier-m8-106.cisco.com/webacs/api/v1/data/Devices/42",
        "@responseType": "getEntity",
        entity: {
          "@url": "https://localhost:/webacs/api/v1/data/Devices/1",
          "@type": "Devices",
          "@dtoType": "devicesDTO",
          devicesDTO: {
            "@id": "1",
            "@displayName": "TestDevice.corp.local",
            clearedAlarms: 1,
            collectionDetail: "Collected",
            collectionTime: "2014-12-04T10 : 16 : 28.285-08 : 00",
            creationTime: "2014-12-04T10 : 16 : 28.285-08 : 00",
            criticalAlarms: 0,
            deviceId: 1,
            deviceName: "TestDevice.corp.local",
            deviceType: "Router",
            informationAlarms: 0,
            ipAddress: "192.168.1.1",
            location: "Strat",
            majorAlarms: 0,
            managementStatus: "MANAGED",
            manufacturerPartNrs: {
              manufacturerPartNr: "String value",
            },
            minorAlarms: 0,
            productFamily: "Router",
            reachability: "REACHABLE",
            softwareType: "IOS-XE",
            softwareVersion: "16.6.7",
            warningAlarms: 0,
          },
        },
      },
    });
  }
);

const server = app.listen(app.get("port"), function () {
  console.log("Server listening on port " + server.address().port);
});
