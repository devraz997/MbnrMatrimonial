# MBNR Matrimonial Web App

A full-stack matrimonial web application built with React.js, Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Profile creation and management
- Advanced search and filtering
- Connection/Interest requests
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
/MbnrMatrimonial
├── client/             # React frontend
│   ├── public/         # Static files
│   └── src/            # React source code
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── context/    # React context
│       └── assets/     # Images, fonts, etc.
├── server/             # Node.js backend
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   └── routes/         # API routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/mbnr-matrimonial.git
   cd mbnr-matrimonial
   ```

2. Install dependencies for both frontend and backend
   ```
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     NODE_ENV=development
     ```

### Running the Application

1. Start the backend server
   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Frontend
- Deploy to Vercel or Netlify

### Backend
- Deploy to Render or Railway

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
