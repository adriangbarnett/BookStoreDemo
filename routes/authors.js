// Authors controller
const express = require('express');
const router = express.Router();
module.exports = router;
const Author = require("../models/author");



// Author index page
router.get("/", (req, res) => {
    res.render("authors/index");
});

// New Author form
router.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() });
});


// Create ONE author
router.post('/', (req, res) => { 

    console.log('VALUE: ' + req.body.active);

    // Fix bool if null
    if (!req.body.active) {
        req.body.active = false;
    }
    else {
        req.body.active = true;
    }


    var author = new Author( {
        name: req.body.name,
        comments: req.body.comments,
        active: req.body.active
    });
 
    author.save( (err, newItem) => {

        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        else {
            console.log(newItem);
            res.status(200).send(newItem); // 204: success
        }
    });
});





// Get ONE by ID
router.get('/id/:id', (req, res) => { 

    console.log("Find 1 by ID");

    // validate exist before update
    Author.findOne({_id: req.params.id}).exec( (err, item) => {

        if (err) {
           console.log(err);
           res.status(400).send(err);
           return;
        }

        if (item == null) {
            res.status(404).json("item not found");
            return;
        }

        else {
            res.send(item);
        } // else

   });

 });

 // Get ONE by name
router.get('/name/:name', (req, res) => { 

    console.log("Find 1 by NAME");

    // validate exist before update
    Author.findOne({name: req.params.name}).exec( (err, item) => {

        if (err) {
           console.log(err);
           res.status(400).send(err);
           return;
        }

        if (item == null) {
            res.status(404).json("not found");
            return;
        }

        else {
            res.send(item);
        } // else

   });

 });


// patch updated ONE
router.patch('/:id', (req, res) => { 

    // validate exist before update
    Author.findOne({_id: req.params.id}).exec( (err, item) => {

        if (err) {
           console.log(err);
           res.status(400).send(err);
           return;
        }

        if (item == null) {
            res.status(404).json("not found");
            return;
        }

        else {

            // found, do patch, update on field(s) with data
            Author.updateOne(
                { 
                    _id: req.params.id 
                },
                { 
                    $set: req.body 

                }, (err) => {

                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }
                    else {
                        console.log(req.body);
                        res.status(200).send(req.body); // 204: success
                        //res.status(200).send("OK"); // 204: success
                    }
                    
                });

        } // else

   });

 });



// Find 1 by ID and delete
router.delete('/id/:id', (req, res) => { 

    // validate exist before delete
    Author.findOne({_id: req.params.id}).exec( (err, item) => {

         if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }

        if (item == null) {
            res.status(404).json("not found");
            return;
        }

        else {

            // exist
            Author.findByIdAndRemove(req.params.id, (err, item) => { 

                if (err){ 
                    console.log(err) 
                    eres.status(400).send(err);
                } 

                else { 
                    console.log("Removed"); 
                    res.status(200).json("OK"); // 204: success
                } 
            }); 
        } // else
    
    });

});


// get ALL
router.get('/all', (req, res) => { 

    Author.find().exec( (err, list) => {

         if (err) {
            console.log(err);
            res.status(400).send("Bad Request");
        }

        else {
            console.log(list);
            res.status(200).json(list);
         }
    });

});


// delete ALL
router.delete('/all', (req, res) => { 

    Author.deleteMany( (err) => { 
        if (err){ 
            console.log(err) 
            eres.status(400).send(err);
        } 

        else { 
            console.log("Removed All"); 
            res.status(200).send("OK"); // 204: success
        } 
    }); 

});
