# Book Review App

This is a Node.js backend application for managing books and their reviews. The project follows a clean architecture using controller, service, repository, and model layers. JWT authentication is implemented, with logic placed inside `utils/authentication.js`.

To run the project:

1. Clone the repository and navigate into the folder.
2. Run `npm install` to install dependencies.
   
PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
JWT_REFRESH_SECRET=your_refresh_jwt_secret  

4. Start the server using `node server.js`.

Dependencies include:  
- Node.js  
- MongoDB  
