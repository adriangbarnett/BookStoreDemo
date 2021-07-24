const express = require('express');
const router = express.Router();
module.exports = router;

//
router.get("/", (req, res) => {
    res.render("index");
});

/*
//
router.post("/", (req, res) => {
    res.send("index-post");
});

//
router.put("/", (req, res) => {
    res.send("index-put");
});

//
router.patch("/", (req, res) => {
    res.send("index-patch");
});

//
router.delete("/", (req, res) => {
    res.send("index-delete");
});
*/