const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/db");

const AgentRouter = require("./Routes/AgentRoute");
const UserRouter = require("./Routes/UserRoute");
const HomeForRentRouter = require("./Routes/HomeForRentRoute");
const HomeForSaleRouter = require("./Routes/HomeForSaleRoute");
const AllHomesRouter = require("./Routes/AllHomesRoute");
const FavouriteHouseRouter = require("./Routes/FavouriteHouseRoute");
const ReviewRouter = require("./Routes/ReviewRoute");
const HomeByOwnerRouter = require("./Routes/HomeByOwnerRoute");
const ConversationRouter = require("./Routes/ConversationRoute");
const MessageRouter = require("./Routes/MessageRoute");

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
app.use("/user", UserRouter);
app.use("/home-for-rent", HomeForRentRouter);
app.use("/home-for-sale", HomeForSaleRouter);
app.use("/home-by-owner", HomeByOwnerRouter);
app.use("/all-homes", AllHomesRouter);
app.use("/favourite-houses", FavouriteHouseRouter);
app.use("/review", ReviewRouter);
app.use("/conversation", ConversationRouter);
app.use("/message", MessageRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs at port ${process.env.PORT}`);
});