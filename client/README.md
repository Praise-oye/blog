HyperionDev Full Stack Web Development Bootcamp - Level 3 - Task 15 - Final Capstone project - Blog

Description

This app is a simple blog that has a React front end and Express backend. It uses a MongoDb database to store the blog posts and allows the user to log in and post blogs. It also has an admin area that an admin can use to delete other users posts or edit them.

Table of Contents
Instructions
Technologies
Installation
Testing
Credits

# Table of Contents

- [Instructions](#instructions)
- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [Credit](#credit)
- [Admin Login Details](#admin)

## Instructions<a name="instructions"></a>
These were the instructions I was given to guide me in this task:

### Follow these steps:

Create a full-stack web application that meets ALL the criteria listed previously for this Capstone Project.
Deploy your app. Add the link to your deployed application to the readme.md file of your project.
Push all the work that you have generated for this project (including the design documentation that you generated in the first part of the project) to GitHub.

## Technologies<a name="technologies"></a>
This project uses:

HTML
CSS
Javascript
Node
React
Express
MongoDB
JSON Web Tokens (JWT)
Jest (for testing)


## Installation<a name="installation"></a>
To run this project, you will first need to modify the MongoDB URI (Uniform Resource Indicator) to point to your own Mongo database. If you are new to MongoDB, visit this link to create your own free database cluster - https://docs.atlas.mongodb.com/getting-started/. 

After creating your own Mongo database,

Copy the project files of this app to a directory called 'blogs' on your local machine.
Navigate to this directory from the command line interface. E.g. cd c:/server. This is the backend of the application.
Open the "database/db.js" file of this app using any text editor and replace the connection string with yours.
Save the changes to the "db.js" file.
Navigate to "/server" directory
In the command line interface, type 'npm install'.
Once it has finished installing, type 'npm start'.
Now navigate to the "client" directory (this is the frontend of the app).
In the command line interface, once again type 'npm install'.
Once it has finished installing, type 'npm start'.
You have now started both the backend and frontend servers.
Open http://localhost:3000 to view the project in your web browser.

## Testing<a name="testing"></a>
To run the snapshot and unit tests for the frontend of the app:

Navigate to the "client" directory from the command line interface. 
Type "npm test".

To run the test for the backend of the app:

Navigate to the "server" directory from the command line interface. 
Type "npm test".

## Admin Login Details<a name="admin"></a>
username: admin
password: admin12

## Credit<a name="credit"></a>
This project was created by Praise Oyeboade as part of a task for HyperionDev Full Stack Development Bootcamp

Repository Link - https://github.com/Praise-oye?tab=repositories