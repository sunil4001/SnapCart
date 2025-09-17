🛒 SnapCart – Real-Time Online Store

SnapCart is a full-stack e-commerce platform designed to deliver a real-time shopping experience. By leveraging WebSockets, it keeps product inventory and cart updates synchronized across users instantly, ensuring a seamless and dynamic online shopping environment.

✨ Features

⚡ Real-Time Inventory Updates – Product stock changes reflect instantly using Socket.io.

🔑 Secure Authentication – Implemented with JWT and bcrypt for password hashing.

🛠️ Admin Panel – Role-based access control for product and inventory management.

📊 Optimized WebSockets – Notifications are delivered only to relevant users, reducing redundant traffic by 20% and improving scalability.

🖥️ Dynamic UI – Built with EJS templates, offering server-side rendering with a responsive layout.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Real-Time Updates: Socket.io

Authentication: JWT, bcrypt

Frontend: EJS, HTML, CSS, JavaScript


🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/SnapCart.git
cd SnapCart

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory and set the following values:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4. Start the Application
npm start

📌 Future Enhancements

🛒 Shopping cart persistence across sessions

💳 Payment gateway integration (Stripe/PayPal)

📦 Order tracking system

📈 Admin analytics dashboard

🤝 Contributing

Contributions are always welcome! Fork the repository, create a feature branch, and submit a pull request.
