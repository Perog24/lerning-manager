import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post(
  '/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure',
    failureFlash: true,
  })
}
);   
   // without passport login (old version)
   // app.post('/login', async (req, res) => {
   //   const {userName, email, password} = req.body;  
   //   const userInDB = await prisma.user.findUnique({
   //     where: {email: email}
   //   });
   //   console.log(userInDB, userName, email, password);
     
   //   if (userInDB?.username === userName && userInDB?.email === email && String(password) === userInDB?.password) {
   //       res.status(200).json({message: "User OK", data: userInDB?.id});
   //   } else {
   //     res.status(201).json({message: "User Not Found"});
   //   }
   // });
export default authRouter;
