// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const session = require("express-session");
const path = require("path");

// Create Express App
const app = express();

// Middleware: parse from data
app.use(express.urlencoded({ extended: true }));

// Middleware: session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "shopaway-secret",
    resave: false,
    saveUninitialized: true,
  }),
);

// Middleware: serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware: inject cart into all views
const injectCart = require("./middleware/injectCart");
app.use(injectCart);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/index"));
app.use("/cart", require("./routes/cart"));
app.use("/shopify", require("./routes/shopify"));
app.use("/myProducts", require("./routes/myProducts"));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Shop Away server running at http://localhost:${PORT}`);
});
