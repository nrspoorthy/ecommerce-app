const express = require("express");
const connectdb = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 3001;
const app = express();


connectdb();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/loginroute");
const cartRoutes = require("./routes/cart");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);


app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
