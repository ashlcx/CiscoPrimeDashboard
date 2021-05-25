"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const Prime = require("../prime/prime");
const router = express.Router();
const globalVariables = require("../varManager");
router.get('/api', (req, res) => {
    Prime.getPrimeResponse().then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log("ERROR CONNECTING TO CISCO PRIME");
        res.send({
            Error: "Could not connect to cisco prime"
        });
    });
});
router.get('/var', (req, res) => {
    res.send(globalVariables.default.clientSide);
});
exports.default = router;
//# sourceMappingURL=index.js.map