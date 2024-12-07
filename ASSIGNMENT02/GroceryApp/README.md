# Grocery App

A simple Node.js application for an online grocery store where users can see, select, and purchase grocery items by categories. The app supports user registration, login, and CRUD operations on grocery items. It utilizes MongoDB for database operations and Express as the web framework.

## Features

- **User Registration & Login**: Secure authentication with hashed passwords using `bcrypt`.
- **CRUD Operations**: Manage grocery items (Create, Read, Update, Delete) via a simple UI.
- **Responsive Design**: Built with Bootstrap for responsiveness.
- **Database Integration**: MongoDB as the database, with Mongoose for schema and querying.
- **Secure Sessions**: Sessions managed with `express-session` and `connect-mongo`.
- **Error Handling**: Comprehensive error handling for smoother user experience.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars (HBS), Bootstrap, Custom CSS
- **Database**: MongoDB with Mongoose
- **Session Management**: `express-session`, `connect-mongo`
- **Hosting**: Render (Deployment)


## Installation

### 1. Clone the Repository

git clone https://github.com/Komalpreet101104/COMP2068JSFrameworks.git
cd COMP2068JSFrameworks/ASSIGNMENT02/GroceryApp

### 2. Install Dependencies

npm install

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following:

CONNECTION_STRING_MONGODB=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
SESSION_SECRET=your_secret_key

### 4. Run the App Locally

npm start

Open your browser and navigate to http://localhost:3000.
