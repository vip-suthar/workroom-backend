# Workroom Automation Backend Assignment

## Assumptions

> Database used is **MongoDB**, and used **mongoose** as library for ODM in the application.
>
> **crypto** module is used to create hash and some salt(random string) to verify passwords
>
> **jsonwebtoken** module is used to create and verify JWT Token, which are exchanged with user(client) in order to verify it's authenticity.
>
> **React** is used to create a simple frontend, with **BootStrap** as a css library.

## Folder Structure

- **index.js** (File) Entry point for the Application.
- **dbConnect.js** (File) contains the database connection setup.
- **config.js** (File) contains configurations and tokens/secret/common resources (Like URLs, or any secret token, etc.) for application.
- **models** (Folder) contains the schemas for storage and retrival of Data in the Database
- **routes** (Folder) contains the routes(API Endpoints) for different requests.
- **Utility** (Folder) contains some common utility classes (files), which are frequently used to do some kind of operation over the data (like JWT Token creation).

## Setting and starting the server

To run the application, first install the npm packages used in the application using the following command at *root* of the application.

    npm install

Now, after installation of all packages, run the following command to start the server

    npm run start

Running this command will start the server and connect to database.

## DEMO

Before testing any API, have a look at [this](api_demo_postman.mkv) demo video.

## Testing APIs

### Signing Up (Register yourself)

To sign up, make the following API call:

- URL :-  [http://localhost:8000/sign-up](http://localhost:8000/sign-up)
- Method/Type of Request :- "POST"
- Headers :-
  
        {
            "Content-Type": "application/json"
        }
- Body :-

        {
            "name": "userName", // name of the user
            "email": "sample@email.abc", // email of the registering user (should be unique)
            "password": "Abcd@1234" // password of the user (generally sent as encrypted hash to server, but i'm keeping it simple for demo purpose)
        }

### Signing In (Login yourself)

To sign in, make the following API call:

- URL :-  [http://localhost:8000/sign-in](http://localhost:8000/sign-in)
- Method/Type of Request :- "POST"
- Headers :-
  
        {
            "Content-Type": "application/json"
        }
- Body :-

        {
            "email": "sample@email.abc" // email of the registering user(should be unique)
            "password": "Abcd@1234" // password entered by the user
        }

### Get All Users Info

To get all users info, make the following API call:

- URL :-  [http://localhost:8000/user](http://localhost:8000/user)
- Method/Type of Request :- "GET"
- Headers :-
  
        {
            "Authorization": "-- JWT Token --" // JWT Token, which client gets in response to signup/signin
        }

### Get a single user's info

To get a single user's info, make the following API call (replace *:id* with the "_id" of user (which client gets in response to signup/signin)):

- URL :-  [http://localhost:8000/user/:id](http://localhost:8000/user/:id)
- Method/Type of Request :- "GET"
- Headers :-
  
        {
            "Authorization": "-- JWT Token --" // JWT Token, which client gets in response to signup/signin
        }

### Update a single user's info (Login yourself)

To update a single user's info, make the following API call (replace *:id* with the "_id" of user (which client gets in response to signup/signin)):

- URL :-  [http://localhost:8000/user/:id](http://localhost:8000/user/:id)
- Method/Type of Request :- "PATCH"
- Headers :-
  
        {
            "Content-Type": "application/json",
            "Authorization": "-- JWT Token --" // JWT Token, which client gets in response to signup/signin
        }
- Body :-

        {
            "name": "new name" // new info(name) of the user
        }

> Since email is unique, so can't update that, instead, delete a user with that email, and signup again.
>
> Haven't added option of password updation to keep it application simple and basic, since it will require the password reset (forget password) functionality, which is easy to implement.

### Delete a single user

To delete a single user, make the following API call (replace *:id* with the "_id" of user (which client gets in response to signup/signin)):

- URL :-  [http://localhost:8000/user/:id](http://localhost:8000/user/:id)
- Method/Type of Request :- "DELETE"
- Headers :-
  
        {
            "Authorization": "-- JWT Token --" // JWT Token, which client gets in response to signup/signin
        }

> Haven't kept the functionality of batch update and delete, but that can also be implemented easily.
