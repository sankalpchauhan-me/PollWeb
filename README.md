# Poll-A-Poll API

## Introduction

Only the api part is functional can be tested through POSTMAN or appropriate software
Tried to implement MVC Architectural Pattern. Authorization is through JSON Web Token, tasks are restricted for unauthorized users. Users can create polls with any number of custom questions & other users can vote on it, the vote from each user is counted only once.

## SAMPLE MODEL FORMAT

### Poll

{
"name":"Who is your favorite captain?",
"author":"Test",
"options":["Dhoni","Virat Kohli","Raina"],
"votes":[5,4,7]
}

### USER

{
"name": "Test User",
"email": "test@test.com",
"role": "user", ("user" by default)
"photo": "user-1.jpg", (optional)
"password": "$2a$12\$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS"
}

# Primary API Routes

| Routes                            | Description                                                           |
| --------------------------------- | --------------------------------------------------------------------- |
| **/api/v1/users/signup**          | POST request signup requires name, email, password & confirm password |
| **/api/v1/users/login**           | POST request for login requires email & password                      |
| **/api/v1/polls/**                | GETs list of polls.                                                   |
| **/api/v1/polls/:pollid**         | GET's a single poll                                                   |
| **/api/v1/polls/user/:name**/     | GET Poll by username                                                  |
| **/api/v1/polls/**                | POSTS and creates a poll (refer poll model format)                    |
| **/api/v1/polls/:pollid/:option** | Casts user votes on a poll with given id and with a given option      |

# Folder Structure:-

| Name            | Description                                           |
| --------------- | ----------------------------------------------------- |
| **routes**      | Contains the routes for polls & users                 |
| **controllers** | Contains the controllers for auth, error, poll & user |
| **utils**       | Various utilities for error handling, & async ops.    |
| **dev-data**    | Contains test data & importing function               |
| **models**      | Mongoose schema and model for User & Polls.           |
| **public**      | Static assets (fonts, css, js, img).                  |
| config.env      | API keys, tokens, passwords and database URI.         |
| .eslintrc       | Rules for eslint linter.                              |
| .gitignore      | Folder and files ignored by git.                      |
| app.js          | The main application file.                            |
| **server.js**   | The entry point                                       |

# Configuration

The database url & password along with JWT_Secret are inside **config.env** . To be replaced with appropriate values.
