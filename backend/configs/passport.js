const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const Bytescale = require("@bytescale/sdk");

const dotenv = require("dotenv");
dotenv.config({ path: "./configs/.env" });
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BYTESCALE_SECRET } =
  process.env;
const User = require("../models/User");

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      const defaultUser = {
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleId: profile.id,
      };

      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return cb(null, existingUser);
        }

        const uploadManager = new Bytescale.UploadManager({
          apiKey: "public_FW25bwn5QGkHc82DUEj1xny3mwub",
        });

        // Define the data you want to upload
        const data = {
          file: profile.photos[0].value, // Assuming this is the file content
        };

        // Configure the options for the upload request
        const options = {
          method: "POST", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/octet-stream", // Set the content type
          },
          body: data, // Set the body of the request with the file content
        };

        // Perform the upload using the uploadManager
        uploadManager.upload(options).then(
          ({ fileUrl, filePath }) => {
            console.log(`File uploaded to: ${fileUrl} and ${filePath}`);
            defaultUser.image = fileUrl;
          },
          (error) => console.error(`Error: ${error.message}`, error)
        );

        const new_user = await User.create(defaultUser);
        return cb(null, new_user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

passport.use(
  "email_register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, _email, _password, cb) => {
      const { name, email, password } = req.body;
      let newUser = {
        email,
        password,
        name,
      };

      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return cb(null, false);
        }
        const new_user = await User.create(newUser);
        return cb(null, new_user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

passport.use(
  "email_login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, _email, _password, cb) => {
      const { email, password } = req.body;

      try {
        if (!email || !password) {
          return cb(null, false);
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return cb(null, false);
        }

        const isMatch = await existingUser.matchPassword(password);
        if (!isMatch) {
          return cb(null, false);
        }

        return cb(null, existingUser);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id).catch((err) => {
    cb(err, null);
  });

  if (user) {
    return cb(null, user);
  }
});
