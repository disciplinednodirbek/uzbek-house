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

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: ["http://localhost:3000", "https://uzbek-house.netlify.app/"],
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
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(
  PORT,
  console.log(
    `Server running  ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
