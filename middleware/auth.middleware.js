function isAuthenticated(){

}

function authMiddleware(req, res, next) {
  if (isAuthenticated()) {
    return next(); 
  }
  throw new Error('Unauthorized access');  
}