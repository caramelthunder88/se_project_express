## Project Name

WTWR (What to Wear?): Back End

## Description of the Project

This is the back-end server for the "What to Wear?" (WTWR) app. It supports a clothing recommendation service that helps users choose what to wear based on the weather. The project is built using Node.js and Express, with MongoDB as the database.

## Functionality

The server lets users create accounts and add clothing items based on weather types like "hot," "warm," or "cold." Users can view all items, delete their own, and like or unlike others. Each item keeps track of who added it and who liked it, and all data is stored in a MongoDB database.

To simulate a logged-in user during development, a temporary middleware adds a test user ID to every request. The server also includes error handling for things like invalid data, missing items, or server issues.

## Technologies and Techniques Used

The back-end server for WTWR is built using Node.js and Express.js, which together provide a lightweight and flexible framework for creating RESTful API routes. For data storage and management, the project uses MongoDB along with Mongoose, a powerful object modeling tool that helps define schemas and interact with the database efficiently.
To ensure that URLs entered for clothing item images and user avatars are valid, the Validator library is used. Code quality and consistency are maintained using ESLint, configured with the Airbnb style guide, and formatted automatically with Prettier to keep the codebase clean and readable.
During development, Nodemon is used to watch for file changes and restart the server automatically, speeding up the development workflow. EditorConfig is included to help enforce consistent code formatting across different text editors and IDEs. Finally, Postman is used to test all API endpoints, making it easier to verify that requests and responses work as expected.

## Links

https://github.com/caramelthunder88/se_project_express

## Frontend Repository

You can find the frontend code here: https://github.com/caramelthunder88/se_project_react
