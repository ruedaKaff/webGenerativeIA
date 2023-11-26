// Assuming you have a function to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        res.redirect('/community');
      // If user is authenticated, proceed to the next middleware or route handler
      return next();
    } else {
        console.log("No logeo redireccionando a login");
        res.redirect('/login'); // Adjust the path to your login route
    }
  };
  
  // Middleware to check if the user is logged in for the post request
  const checkLogged = (req, res, next) => {
    if (req.method === 'POST') {
      // If it's a POST request, check if the user is logged in
      isLoggedIn(req, res, next);
    } else {
      // For other request methods, just continue to the next middleware
      next();
    }
  };
  

  export {checkLogged, isLoggedIn}