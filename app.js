const express = require("express");
const app = express();
const flash = require("connect-flash");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http"); // Add this

require("dotenv").config();

const db = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(flash());
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Create HTTP server and integrate Socket.io
const server = http.createServer(app);
const io = require("socket.io")(server);

// Store product quantities in memory (for demo purposes)
// In production, you'd want to use Redis or similar
const productQuantities = {};

// Socket.io connection handling
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join room for specific product updates
    socket.on("join-product-room", (productId) => {
        socket.join(`product-${productId}`);
        console.log(`User ${socket.id} joined product-${productId}`);
    });

    // Handle cart updates
    socket.on("cart-updated", (data) => {
        // Broadcast to all users except the sender
        socket.broadcast.emit("cart-count-update", {
            userId: data.userId,
            cartCount: data.cartCount
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Make io accessible to our routers
app.set("io", io);

// Listen on server instead of app
server.listen(3000, () => {
    console.log("Server running on port 3000");
});