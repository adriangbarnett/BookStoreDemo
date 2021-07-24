# Project Title

Demo bookstore database using Mongo DB


## Getting Started

TODO


### Prerequisites

Installed development software
    VSCode
    Git terminal
    NodeJS v16.2.0
    NPM 7.13.0

    Install MongoDB on local host and run it 
    
    OR 
    
    Register and start a remote MongoDB service



### Installing / Setup

Install the required dependencies
	$ npm init
	$ npm install dotenv
	$ npm install path
	$ npm install express
	$ npm install body-parser
	$ npm install mongoose
    $ npm install ejs
    $ npm install express-ejs-layouts
    $ npm --save-dev nodemon


## Configure app.env

You need remote or local mongo db running. Create a app.env file then add the following vars

Using Remote:
    MONGODB_URL=mongodb+srv://XXXXXXXX@cluster0.euffl.mongodb.net/YYYYYYYY?retryWrites=true&w=majority

        Where XXXXXXXX is your Mongo DB auth string / url
        Where YYYYYYYY is your Mongo DB database name

Using LocalHost: 
    MONGODB_URL=mongodb://localhost:27017/demoBookStoreDB


Define the local host port
    LOCALHOST_PORT=3000

    


## Running the applciation

	$ nodemon localhost 3000
    $ npm run devStart

	$ http://localhost:3000


## Running the tests

TODO:  Explain how to run the automated tests for this system


### Break down into end to end tests

TODO:  Explain what these tests test and why

```
TODO Example
```

### And coding style tests

TODO:  Explain what these tests test and why

```
TODO Example
```

## Deployment

TODO:  Add additional notes about how to deploy this on a live system

## Built With

* [TODO:]

## Authors

* **Adrian Barnett**

## License

No Licence

## Acknowledgments

* TODO
* TODO
* TODO

{"mode":"full","isActive":false}