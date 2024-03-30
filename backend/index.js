const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const Blog = require("./models/Blog");

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
const houseRouter = require("./routes/house");
const blogRouter = require("./routes/blog");

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
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay,
      secure: false,
    },
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/available-times", availableTimeRouter);
app.use("/api/v1/conditions", conditionRouter);
app.use("/api/v1/units", unitRouter);
app.use("/api/v1/regions", regionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/houses", houseRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

const server = app.listen(
  PORT,
  console.log(
    `Server running  ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

let io = require("./socket").init(server);

io.on("connection", (socket) => {
  socket.io = io;
  console.log("Client connected");

  socket.on("send_comment", async ({ text, blogId, currentUserId }) => {
    try {
      const [blog, user] = await Promise.all([
        Blog.findById(blogId).populate("comments.user").select("comments"),
        User.findById(currentUserId),
      ]);

      if (!blog || !user) {
        socket.emit("send_comment_result", false);
        return;
      }

      blog.comments.push({
        user: currentUserId,
        text,
      });

      await blog.save();
      const updatedComments = await Blog.findById(blogId)
        .populate("comments.user")
        .select("comments");

      io.to(blogId).emit("updateComments", updatedComments);
      socket.emit("send_comment_result", true);
    } catch (error) {
      console.error("Error in send_comment:", error);
      socket.emit("send_comment_result", false);
    }
  });

  socket.on("getAllComments", async ({ blogId }) => {
    try {
      await socket.join(blogId);
      const blog = await Blog.findById(blogId)
        .populate("comments.user")
        .select("comments");

      if (!blog) {
        socket.emit("getAllComments_result", null);
        return;
      }

      socket.emit("getAllComments_result", blog);
    } catch (error) {
      console.error("Error in getAllComments:", error);
      socket.emit("getAllComments_result", null);
    }
  });
});

// let io = require("./socket").init(server);
// io.on("connection", (socket) => {
//   socket.io = io;
//   console.log("Client connected");

//   socket.on("send_comment", async ({ text, blogId, currentUserId }) => {
//     const blog = await Blog.findById(blogId)
//       .populate("comments.user")
//       .select("comments");

//     const user = await User.findById(currentUserId);

//     if (!blog || !user) {
//       return socket.emit("send_comment_result", false);
//     }

//     blog.comments.push({
//       user: currentUserId,
//       text,
//     });

//     await blog.save();
//     const updated = await Blog.findById(blogId)
//       .populate("comments.user")
//       .select("comments");
//     socket.nsp.to(blogId).emit("updateComments", updated);
//     return socket.emit("send_comment_result", true);
//   });

//   socket.on("getAllComments", async ({ blogId }) => {
//     await socket.join(blogId);
//     const blog = await Blog.findById(blogId)
//       .populate("comments.user")
//       .select("comments");
//     if (!blog) {
//       return socket.emit("getAllComments_result", null);
//     }

//     return socket.nsp.to(blogId).emit("getAllComments_result", blog);
//   });
// });
