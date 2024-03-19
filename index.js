const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");

const AgentRouter = require("./Routes/AgentRoute");
const HomeForRentRouter = require("./Routes/HomeForRentRoute");
const HomeForSaleRouter = require("./Routes/HomeForSaleRoute");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

db;

app.get("/", (req, res) => {
    res.json({ message: "Real Estate Backend is running correctly!!!" });
});

app.use("/agent", AgentRouter);
app.use("/home-for-rent", HomeForRentRouter);
app.use("/home-for-sale", HomeForSaleRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs at port ${process.env.PORT}`);
})

