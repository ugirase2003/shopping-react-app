# Shopping React App README 
live link:https://dapper-unicorn-6a274d.netlify.app/


Welcome to the README file for your Shopping React App! This document will guide you through the setup, features, and usage of the app, which incorporates a variety of technologies including React, Tailwind CSS, Express, MongoDB Atlas, bcryptjs for password encryption, and Redux for state management. The app provides login and register functionalities with secure password storage, JWT token authentication, a responsive design, category-wise shopping, a cart system, and more. Please note that the app is still under development and undergoing bug fixes.

## Technologies Used

- React
- Tailwind CSS
- Express
- MongoDB Atlas
- bcryptjs for password encryption
- Redux for state management

## Features

- **User Authentication:** Secure login and register functionality with encrypted passwords using bcryptjs.
- **JWT Token:** Utilizes JWT tokens for authenticated user sessions.
- **Profile Editing:** Users can update their profile information.
- **Category-wise Shopping:** Products are categorized for easy navigation.
- **Responsive Design:** The app is designed to work seamlessly on various devices.
- **Cart System:** Customers can add multiple items to their cart.
- **State Management:** Redux is used for efficient state management.
- **Under Development:** The app is actively being developed and refined.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js and npm installed
- MongoDB Atlas account for database setup
- Basic knowledge of React, Redux, and Express

## Getting Started

Follow these steps to set up and run the app:

1. **Clone Repository:** Clone this repository to your local machine using `https://github.com/ugirase2003/shopping-react-app.git`.

2. **Client Setup:**
   - Navigate to the `frontend` directory using `cd frontend`.
   - Install client dependencies with `npm install`.
   - Start the client development server with `npm start`.

3. **Server Setup:**
   - Navigate to the `server` directory using `cd server`.
   - Install server dependencies with `npm install`.
   - Create a `.env` file with your MongoDB Atlas connection string and JWT secret key:
     ```
     DB=your-mongodb-atlas-connection-string
     SECRET_KEY=your-jwt-secret-key
     ```
   - Start the server with `npm start`.

4. **Access the App:** Open your browser and navigate to `http://localhost:3000` to access the app.

5. Live Demo: Check out the live demo of app:https://dapper-unicorn-6a274d.netlify.app/
     Backend: Render
     Frontend: Netlify
   

## Usage

1. **User Registration/Login:** Users can register and log in securely.
2. **Profile Editing:** Edit and update user profile information.
3. **Category-wise Shopping:** Browse products by categories.
4. **Adding to Cart:** Add multiple items to the cart.
5. **Responsive Design:** Experience a seamless app across different devices.

## Known Issues

- The app is still under development and may contain bugs.

## Contributions

Contributions are welcome! If you find any bugs or want to contribute, feel free to submit issues or pull requests.



## Contact

If you have any questions or need assistance, you can reach out to ugirase2003@gmail.com.

