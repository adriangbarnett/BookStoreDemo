// Keys CRUD

const express = require('express');
const router = express.Router();
module.exports = router;

//
router.get("/", (req, res) => {
    res.send("api-get");
});

//
router.post("/", (req, res) => {
    res.send("api-post");
});

//
router.put("/", (req, res) => {
    res.send("api-put");
});

//
router.patch("/", (req, res) => {
    res.send("api-patch");
});

//
router.delete("/", (req, res) => {
    res.send("api-delete");
});


// Generate a new key