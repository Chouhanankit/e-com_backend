const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./backend/config/config_db");
const { errorHandler } = require("./backend/middleware/errorHandler");
const session = require("express-session")
const passport = require("passport");
const path = require('path');

const app = express();

// port on server running
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// bata base connection
connectDB();


app.use(
  session({
    secret: "123456789akshay",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
require("./backend/config/passportConfig")
app.use("/Auth" , require("./backend/routes/Authroute"))

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// user router
app.use("/api/user", require("./backend/routes/userRoutes"));

// product route
app.use('/api/products', require("./backend/routes/productRoutes"));

// admin route 
app.use("/api/admin" , require("./backend/routes/adminRoutes"))

//error handler
app.use(errorHandler);

// console on terminal
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`.bgBlue);
});
