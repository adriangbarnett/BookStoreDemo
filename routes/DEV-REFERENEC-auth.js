const express = require('express');
const router = express.Router();
module.exports = router;
const errorHandler = require("../handlers/errorHandlers");


// Passport
const session = require('express-session');     
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// Init
router.use(passport.initialize());
router.use(passport.session());

// requires the model with Passport-Local Mongoose plugged in
const User = require("../models/user");

// create local login stragey
passport.use(User.createStrategy());

//serialize and deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// hashing
const bcrypt = require('bcrypt');

router.get("/danger", (req, res) => {


    let errors = [];

    let green = [];


    green.push({ msg: 'list1' });
    green.push({ msg: 'list2' });

    //res.render("register", {message: ""} );
    //res.render("register", {"success_msg": "success"} );
    //res.render("register", {"error_msg": "error"} );
    //res.render("register", {"error": "error"} );

    // //req.flash('success_msg','Success Message')
    // req.flash('error_msg','Danger message1');
    // req.flash('error_msg','Danger message2');
     req.flash('error_msg','Danger message3');
     res.redirect('/auth/register');

    //res.render("register", {"success_msg": 'freenMessage', username: "username", password: "password", password2: "password"} );
    //res.render("register", {"error_msg": 'errroMessage', username: "username", password: "password", password2: "password"} );
   // res.render("register", {"error": 'errrOnly', username: "username", password: "password", password2: "password"} );
    //res.render("register", { green, username: "username", password: "password", password2: "password"} );
    //res.render("register", { green, username: "username", password: "password", password2: "password"} );
   //res.render("register", { green, username: "username", password: "password", password2: "password"} );


});



// --------------------------------------------------------------------
// POST
// --------------------------------------------------------------------
router.post('/register', (req, res) => { 


    const { username, password, password2 } = req.body;
    let errors = [];



    // sanity check field values
    if (!username || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // password compare
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // password len check //todo: put this in a server config
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    // check user exist
    User.findOne( { username: username}, (err, foundUser) => { 
        if (foundUser) {
        // not found
        console.log("User already exists");
        errors.push({ msg: 'Username is already in use' });
        }
    });


    // errors
    if (errors.length > 0) {
        console.log(errors);
        // send error and re-populate text fields
        res.render('register', { errors, username, password, password2 } );
    }
    else {
        // no errrors

        //
        const user = new User({ 
            username: req.body.username, 
            password: req.body.password
        });


        // salt then hash password
        bcrypt.genSalt(10, (err, salt) =>  {

            bcrypt.hash(user.password, salt, (err, hash) => {

                if (err) {
                    console.log(err);
                    res.render("register", {"error": err, username, password, password2} );
                }
                else {

                    // set password to hash then save
                    user.password = password;

                    user.save( (err, item) => {

                        if (err) {
                            console.log(err);
                            res.render("register", {"error": err, username, password, password2} );
                        }
                
                        else {
                            console.log("User added");
                            req.flash('error_msg','You are now registered and can log in' );
                            res.redirect('/auth/login');
                        }
                    });

                }

            }); // hash

        }); // salt


    }// else
       

});



// --------------------------------------------------------------------
// GET
// --------------------------------------------------------------------
router.get('/', (req, res) => { 

    res.redirect("/");
});

router.get('/login', (req, res) => { 
    
    res.render("login");

});

router.get('/register', (req, res) => { 
    
    res.render("register", {message: ""} );

});