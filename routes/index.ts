/*
 * GET home page.
 */
import express = require('express');
import Prime = require('../prime/prime');
import primeInterfaces = require('../prime/primeInterfaces');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    Prime.getPrimeResponse().then((response: primeInterfaces.primeResponse) => {
        displayreachable(req, res, response);
    })
    
});

function displayreachable(req: express.Request, res: express.Response, primeResponse: primeInterfaces.primeResponse) {
    if (primeResponse.reachable["@count"]) {
        primeResponse.reachable.entityId.forEach((value) => {
            Prime.getDeviceDetails(value).then((res) => {
                console.log(res);
            })
        })
    } else {
        console.log("NO REACHABLE DEVICES");  
    }

    if (primeResponse.unreachable["@count"]) {
        primeResponse.unreachable.entityId.forEach((value) => {
            Prime.getDeviceDetails(value).then((res) => {
                console.log(res);
            })
        })
    } else {
        console.log("NO UNREACHABLE DEVICES");
    }


    res.render('index', {
        title: 'Cisco Prime reachable',
        unreachable: "Unreachable",
        Ucount: primeResponse.unreachable["@count"],
        reachable: "Reachable",
        Rcount: primeResponse.reachable["@count"]
    });
}

export default router;