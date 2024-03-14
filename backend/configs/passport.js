const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ImageKit = require("imagekit");

const dotenv = require("dotenv");
dotenv.config({ path: "./configs/.env" });
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,IMAGEKIT_PUBLICKEY,IMAGEKIT_PRIVATEKEY,IMAGEKIT_URLENDPOINT } = process.env;
const User = require("../models/User");

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLICKEY,
  privateKey: IMAGEKIT_PRIVATEKEY,
  urlEndpoint: IMAGEKIT_URLENDPOINT,
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        let profileImageURL = null;

        if (profile.photos && profile.photos.length > 0) {
          const photoUrl = profile.photos[0].value;

          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser && existingUser.image) {
            profileImageURL = existingUser.image;
          } else {
            const imageUploadResponse = await imagekit.upload({
              file: photoUrl,
              fileName: `${profile.id}-profile-picture`,
            });
            profileImageURL = imageUploadResponse.url;
          }
        }

        const defaultUser = {
          name: `${profile.name.givenName}${
            profile.name.familyName ? " " + profile.name.familyName : ""
          }`,
          email: profile.emails[0].value,
          googleId: profile.id,
          image: profileImageURL,
        };

        const existingUser = await User.findOneAndUpdate(
          { googleId: profile.id },
          defaultUser,
          { upsert: true, new: true }
        );

        return cb(null, existingUser);
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
