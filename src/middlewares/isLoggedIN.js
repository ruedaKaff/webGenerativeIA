// Assuming you have a function to check if the user is logged in
const isLoggedIn = (req, res, next) => {
  console.log("Checking if user is logged in");
  console.log(req.session.id);
   
  
  if (req.session && req.session.passport) {
    const user = req.session.passport.user;
    console.log("Session user:", user );
    // If user is authenticated, proceed to the next middleware or route handler
    req.user = user;
    return next();
  } else {
    // Send a 401 status code and a message indicating that the user is not authenticated
    res.send("session doesnt exists");
  }
};
  // Middleware to check if the user is logged in for the post request
  const checkLogged = (req, res, next) => {
    if (req.method === 'POST' && req.user) {
      console.log("All able");
      // If it's a POST request, check if the user is logged in
      return next()
    } else {
      // For other request methods, just continue to the next middleware
      return res.json({Response:"Some require is missed"})
    }
  };
  

  export {checkLogged, isLoggedIn}