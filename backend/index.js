const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const connectToDatabase = require("./configs/database");
const errorHandler = require("./middlewares/error");
require("./configs/passport");

dotenv.config({ path: "./configs/.env" });

connectToDatabase();
const authRouter = require("./routes/auth");
const availableTimeRouter = require("./routes/availableTime");
const conditionRouter = require("./routes/condition");
const unitRouter = require("./routes/unit");
const regionRouter = require("./routes/regions");
const userRouter = require("./routes/user");

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay,
      httpOnly: false,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/available-times", availableTimeRouter);
app.use("/api/v1/conditions", conditionRouter);
app.use("/api/v1/units", unitRouter);
app.use("/api/v1/regions", regionRouter);
app.use("/api/v1/user", userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server running  ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
