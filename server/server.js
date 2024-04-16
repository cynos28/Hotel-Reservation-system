require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute.js"); //shehan's route
const errorHandler = require("./middleware/middleware.js");
const route = require("./routes/roomRoute.js");
const eventRouter = require("./routes/eventRoute.js"); //Kaveesha's route import

const RateRoute = require("./Routes/RateRoute.js"); //Charuka's route import

const taskroute = require("./routes/taskRoute.js");
const dotenv = require("dotenv");

const foodRouter = require("./routes/FoodRoute.js"); //Kavish's route import
const cartRouter = require("./routes/FoodCartRoute.js"); //Kavish's route import
const deliveryRouter = require("./routes/FoodDeliveryRoute.js"); //Kavish's route import

const paymentRoute = require("./routes/paymentRoute.js"); // payment route-Isha
const cardRoute = require("./routes/cardRoute.js");

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from localhost:3000
    credentials: true, // Allow sending cookies from frontend to backend
  })
);



// Routes
app.use("/api/users", userRoute);
app.use("/api", route);

app.use("/api/event", eventRouter); //Kaveesha's route
app.use("/api/event/register", eventRouter); //Kaveesha's route
app.use("/api", taskroute); //room tasks Routes
app.use("/rates", RateRoute); //Charuka's route

app.use("/foods", foodRouter); // localhost:5000/foods kavish's
app.use("/carts", cartRouter); // localhost:5000/carts kavish's
app.use("/deliveries", deliveryRouter); // kavish's

app.use("/api/users/:userId/cards", cardRoute); // payment-Isha
app.use("/api/bookings/:bookingId/payments", paymentRoute);
app.use("/api/payments", paymentRoute);

//BookingRoute//Nilan
const bookingRouter = require("./routes/BookingRoute.js");

app.use("/bookings", bookingRouter);


app.get("/", (req, res) => {
  res.send("Home Page");
});

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
