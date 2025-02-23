# Rakcha Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO.

## Features

- Real-time messaging
- User authentication
- Private conversations
- Online status indicators
- Message history
- Responsive design

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.IO
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/mootezbh/rakcha.git
cd rakcha
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
   Create `.env` files in both backend and frontend directories with necessary configuration.

Backend `.env` template:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rakcha
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the application

```bash
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
