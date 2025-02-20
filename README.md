# Fashion Ethnic - MERN Stack Project

Fashion Ethnic is a full-stack e-commerce web application built using the MERN stack. It provides a seamless shopping experience with features like authentication, cart management, order placement, and payment processing.

## 🚀 Features

- **User Authentication**: Login, Signup, Logout
- **Google Login**
- **Role-Based Authorization**: Admin and User roles
- **Wishlist & Cart Management**
- **Redis Caching for Performance Optimization**
- **Notification Microservices using Redis Pub/Sub**
- **Email Notifications**: On user registration & order placement
- **Forgot Password Feature**
- **Razorpay Payment Gateway Integration**

## 🖥️ Deployment Links

- **Frontend**: [Live Demo](https://fashion-ethnic.vercel.app/)
- **Backend**: [API Server](https://fashionethnic.onrender.com)
- **API Documentation**: [Postman Docs](https://documenter.getpostman.com/view/28284142/2sAYdZvaGg)

## 📦 Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (v16 or later)
- MongoDB
- Redis

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fashion-ethnic.git
   cd fashion-ethnic/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   REDIS_URL=your_redis_url
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure API URL:
   ```env
   REACT_APP_API_URL=https://your-backend-link.com
   ```
4. Start the frontend server:
   ```sh
   npm start
   ```

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Caching**: Redis
- **Authentication**: JWT, Google OAuth
- **Payment**: Razorpay
- **Microservices**: Redis Pub/Sub for notifications
- **Deployment**: Netlify (Frontend), Render (Backend)

## 📝 License
This project is licensed under the MIT License.

---

### 👨‍💻 Contributing
Feel free to fork this repo and submit pull requests. Suggestions and improvements are welcome!

📧 **Contact:** your-email@example.com
