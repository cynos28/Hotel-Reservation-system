require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute.js");
const eventRouter = require("./routes/eventRoute.js");//Kaveesha's route import
const errorHandler = require("./middleware/middleware.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use("/api/users", userRoute);
app.use("/api/event",eventRouter); //Kaveesha's route


app.get("/", (req, res) => {
    res.send("Home Page");
});


//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server Running on ${PORT}`);
        });
    })
    .catch((err) => console.error("MongoDB Connection Error:", err));