/*
    REST API || CRUD

    REST            CRUD
    ----------------------
    post            CREAT
    get             READ
    put             UPDATE  - Update all
    patch           UPDATE  - Update some
    delete          DELETE

*/
var express = require('express');
const router = express.Router();
module.exports = router;
const errorHandler = require("../handlers/errorHandlers");
const Article = require("../models/article");

////////////////////////////////////// SINGLE ITEM //////////////////////////////////////


// create ONE
router.post('/article', (req, res) => { 

    var newItem = new Article( {
        title: req.body.title,
        content: req.body.content
    });
 
    newItem.save( (err, item) => {

        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        else {
            console.log(item);
            res.status(200).send("OK"); // 204: success
        }
    });
});


// get ONE by ID
router.get('/article/:id', (req, res) => { 

    Article.findOne({_id: req.params.id}).exec( (err, list) => {

        if (err) {
           console.log(err);
           res.status(400).send(err);
       }

       else {
           console.log(list);
           res.status(200).json(list);
        }
   });

});


// create ONE
router.post('/article', (req, res) => { 

    var newItem = new Article( {
        title: req.body.title,
        content: req.body.content
    });
 
    newItem.save( (err, item) => {

        if (err) {
            console.log(err);
            res.status(400).send(err);
        }

        else {
            console.log(item);
            res.status(200).send("OK"); // 204: success
        }
    });
});


// patch PARTIAL updated ONE
router.patch('/article/:id', (req, res) => { 

    
    // validate exist before update
    Article.findOne({_id: req.params.id}).exec( (err, item) => {

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

            // found, do patch
            // update on filed with data
            Article.updateOne(
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
                        res.status(200).send("OK"); // 204: success
                    }
                    
                });

        } // else

   });

   

 });



// update (REPLACE) ONE by ID
router.put('/article/:id', (req, res) => { 


    // validate exist before update
    Article.findOne({_id: req.params.id}).exec( (err, item) => {

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

            // found, do update
            Article.findOneAndUpdate( 
                { 
                    _id: req.params.id  
                },
                { 
                    $set: 
                    { 
                        title: req.body.title,
                        content: req.body.content,
                    },
                    
                },

                function(err, item) {

                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    }

                    else {
                        // return body because item does 
                        // not show updated values
                        console.log(req.body);
                        res.status(200).send("OK"); // 204: success
                    }
                }
            );

        } // else

   });


 

});


// delete ONE
router.delete('/article/:id', (req, res) => { 

    // validate exist before delete
    Article.findOne({_id: req.params.id}).exec( (err, item) => {

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

            // exist
            Article.findByIdAndRemove(req.params.id, (err, item) => { 

                if (err){ 
                    console.log(err) 
                    eres.status(400).send(err);
                } 

                else { 
                    console.log("Removed"); 
                    res.status(200).send("OK"); // 204: success
                } 
            }); 
        } // else
    
    });

});



////////////////////////////////////// MANY ITEM //////////////////////////////////////


// get ALL
router.get('/articles', (req, res) => { 

    Article.find({}).exec( (err, list) => {

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


// get many by title
router.get('/articles/:title', (req, res) => { 

    Article.find( { title: req.params.title } ).exec( (err, list) => {

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
router.delete('/articles', (req, res) => { 

    Article.deleteMany( (err) => { 

        if (err){ 
            console.log(err) 
            eres.status(400).send(err);
        } 

        else { 
            console.log("Removed"); 
            res.status(200).send("OK"); // 204: success
        } 
    }); 

});

////////////////////////////////////// DEV DEBUG  //////////////////////////////////////
// dev add many
router.get('/articles/dev/:action', (req, res) => { 

    if (req.params.action != "devadd") {
        res.status(400).send("Bad request, invalid action "); // 204: success
    }
    else {

        for (i = 0; i < 10; i++ ) {
            const newItem = new Article({
    
                title: "title" + i,
                content:"myLacontentstName" + i,
    
            });
    
            newItem.save( (err) => {

                if(err) {
                    console.log(err);
                    eres.status(400).send(err);
                }

                else {
                    console.log("Added iten(s)");
                }
            });

        } // next

        res.status(200).send("OK"); // 204: success
    }


});