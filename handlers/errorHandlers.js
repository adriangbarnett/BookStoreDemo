/**
 * Catch Errors Handler
 * Instead of using try{} catch(e) {} in each controller, we wrap the function in
 * catchErrors(), catch any errors they throw, and pass it along to our express middleware with next().
 */

module.exports.catchErrors = (fn) => {
    console.log("--CATCH--");
    return function (request, response, next) {
      return fn(request, response, next).catch((e) => {
        if (e.response) {
          e.status = e.response.status
        }
        next(e)
      })
    }
  }
  
  
  // bad request
  module.exports.badRequest  = (res, err) => {
    let errCode = 400;
    res.status(errCode);
    res.render( 'error', { errorHeading:  errCode + " Bad request" , errorText: err } );
  }
  
  // not found
  module.exports.notFound  = (res, err) => {
    let errCode = 404;
    res.status(errCode);
    res.render( 'error', { errorHeading:  errCode + " Not found" , errorText: err } );
  }
  
  // access denied
  module.exports.forbidden  = (res, err) => {
    let errCode = 403;
    res.status(errCode);
    res.render( 'error', { errorHeading:  errCode + " Forbidden" , errorText: "You dont have permission to peform this request, or the authentication token passed was invalid."} );
  }
  
  // 500 Internal Server Error
  // The server has encountered a situation it doesn't know how to handle.
  module.exports.internalServerError  = (res, err) => {
    let errCode = 500;
    res.status(errCode);
    res.render( 'error', { errorHeading:  errCode + " Forbidden" , errorText: "You dont have permission to peform this request, or the authentication token passed was invalid."} );
  }
  