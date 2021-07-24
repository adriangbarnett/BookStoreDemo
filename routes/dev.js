// dev api testing
const express = require('express');
const router = express.Router();
module.exports = router;

// get
router.get("/", (req, res) => {
    var s = "ID: " + req.query.id + "\r\n" + "NAME: " + req.query.name;
    res.send(s);
});

// post
router.post('/', (req, res) => { 

    var s = "ID: " + req.query.id 
        + "\r\nNAME: " + req.query.name
        + "\r\AUTH: " + req.query.auth 
        + "\r\nTEXT: " + req.body.text 
        + "\r\nBOOL: " + req.body.bool 
        + "\r\NUMBER: " + req.body.number; 
    res.send(s);
 });// post
