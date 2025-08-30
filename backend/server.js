const express = require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const cors = require("cors"); 
const app = express();


connectdb();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/loginroute");
const cartRoutes = require("./routes/cart")


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/cart",cartRoutes)

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
