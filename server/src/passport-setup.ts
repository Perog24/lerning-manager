import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import session from "express-session";

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: "Неправильний email або пароль",
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, {
            message: "Неправильний email або пароль",
          });
        }

        return done(null, user ? user : false);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user ? user : false);
});

export const initializePassport = () => {
  return passport.initialize();
};
export const initializePassportSession = () => {
  return passport.session();
};
export const sessionConfig = () => {
  return session({
    secret: "acbjkcvbmfdhshrnfhchsnelxfpdowmsabsgchd",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  });
};
