import { Router } from "express";
import passport from "passport";

const authRouter = Router();


authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: any, user: Express.User) => {
    if (err) console.error(err);
    req.login(user, () => {
      return res.json(user);
    });
  })(req, res);
});

export default authRouter;
