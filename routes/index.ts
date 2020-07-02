/*
 * GET home page.
 */
import express = require('express');
import Prime = require('../prime/prime');
import primeInterfaces = require('../prime/primeInterfaces');
const router = express.Router();
const variables = require('../variables');

router.get('/api', (req: express.Request, res: express.Response) => {
    Prime.getPrimeResponse().then((response: primeInterfaces.primeResponse) => {
        res.send(response);
    }).catch((err) => {
        console.log("ERROR CONNECTING TO CISCO PRIME");
        res.send({
            Error: "Could not connect to cisco prime"
        });

    })
});

export default router;