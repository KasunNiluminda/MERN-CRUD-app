Full-Stack CRUD Application

# MERN-CRUD-app
This project is a MERN stack application designed for a practical test. The application allows users to manage a list of users with features for creating, reading, updating, and deleting user records. It includes a frontend built with React JS and a backend developed using Node.js and Express.js, with MongoDB as the database.


--------------Features : ---------------

*Add New User: A form to input user details including first name, last name, date of birth, address, and gender.
*Display Users: A table to list all users from the database.
*Edit User: Option to update user details.
*Delete User: Option to remove a user from the list.
**Search Bar: Filter users based on their names or other attributes (implemented using Material UI).


--------------API Endpoints : ------------

*GET /api/users
        : Retrieve all users from the database.
*GET /api/users/
        : Retrieve a user by their ID.
*POST /api/user
        : Create a new user.
*PUT /api/users/
        : Update an existing user by their ID.
*DELETE /api/users/
        : Delete a user by their ID.


----------------Technologies Used---------------

*Frontend: React JS, Material UI (for UI components and styling)
*Backend: Node.js, Express.js
*Database: MongoDB

---------------------------------------------------------------
-------------------------Installation-----------------------------
To set up and run this project on your local machine, follow these steps:

1. Clone the Repository
First, clone the repository to your local machine using Git:
    git clone https://github.com/yourusername/your-repo-name.git

Navigate into the project directory:

2. Set Up Backend
Navigate to the backend directory:
    cd backend  
Install the required backend dependencies:
    npm install
Create a .env file in the backend directory and add the following environment variables:
    MONGO_DATABASE_URI=your_mongodb_connection_string

Replace your_mongodb_connection_string with your actual MongoDB connection string.

3. Set Up Frontend
Navigate to the frontend directory:
    cd ../frontend

Install the required frontend dependencies:
    npm install

4. Run the Application
To start the development servers, follow these steps in separate terminal windows:

For the backend server:
    cd backend
    npm start    -> (in backend directory )

For the frontend server:(in frontendend directory )
    cd ../frontend
    npm start   -> (in frontendend directory )


5. Access the Application
Frontend: Open your browser and go to http://localhost:3000 to access   the user interface.
Backend API: The API will be available at http://localhost:5000.


![MERN_CRUD_IMG](https://github.com/user-attachments/assets/ee657130-18aa-4ade-be7b-09abd5806c3e)
