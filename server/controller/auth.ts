import {ZodError, z} from "zod";
import User from "../models/users";
import { NextFunction, Request, Response } from "express";
import createSecretToken from "../utils/secretToken";
import { hashPassword, verifyPassword } from "../utils/password";
import createRefreshToken from "../utils/createRefreshToken";
import Resume from "../models/Resume";

//sigup

const signUpSchema = z
  .object({
    username: z.string({ required_error: "username is required" }),
    email: z.string().email(),
    password: z.string().min(8).max(16).refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(value), {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
    }),
    confirmPassword: z.string().min(8).max(16)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Password and confirm password must match",
  });
  type TSignUpSchema= z.infer<typeof signUpSchema>;
  export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
 
    try {
      const validation=  signUpSchema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).send({status:false, message: validation.error.issues[0].message });
        }
        const { email, password, username, photo } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).send({status:false, message: "user already exists" });
      }
      
      const hashedPassword =  await hashPassword(password);
     
      const user = await User.create({
        username: username +
        Math.random().toString(36).slice(-8),
        email,
        password: hashedPassword,
      });
      await user.save();
      const user2 = user.toObject();
      delete user2.password;
      res
        .status(201)
        .send({ status: true, message: "user signed in successfully" });
    } catch (error) {
      res.status(500).send({status:false, message:"internal server error"})
    }
  };
  

  //signin

  export const logIn = async (req: Request, res: Response) => {
   
  
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(403)
          .send({ status: false, message: "all fields are mandatory" });
      }
  
      const existingUser = await User.findOne({ email }).populate([
        {path:"resume",model:Resume}
      ]);
  
      if (!existingUser) {
        return res
          .status(403)
          .send({ status: false, message: "user doesnt exist" });
      }
  
      const isPasswordMatched = await verifyPassword(
        password,
        existingUser.password as string
      );
  
      if (!isPasswordMatched) {
        return res
          .status(403)
          .send({ status: false, message: "invalid credentials" });
      }
      const token = createSecretToken(existingUser._id);
      
      const refreshToken = createRefreshToken(existingUser._id);
      const user = {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        resume:existingUser.resume
      };
      const expiryDate = new Date(Date.now() + 7200000); //1hour
  
      res
        .cookie("refresh_token", refreshToken, {
          httpOnly: false,
          expires: expiryDate,
          secure: true,
          sameSite:"none" 
        })
        .status(200)
        .send({ status: true, message: "user logged in successfully", user,token });
    } catch (error) {
      res.status(500).send({status:false, message:"internal server error"})
    }
  };

//user

// export const getUser =async(req:Request, res:Response)=>{
//   const userId = req.body.userId;
// const token = req.body.token;
// try {
//   const userExists = await User.findOne({_id:userId});
//   const user = {
//       _id: userExists?._id,
//       username: userExists?.username,
//       email: userExists?.email,
//     };
//     if(token){
//       return  res.status(200).send({status:true, user,token})
//     }
//  return res.status(200).send({status:true, user})
// } catch (error) {
//   res.status(500).send({status:false, message:"you cant acces this user"})
// }

// }

  //signout

  
export const signOut=(req:Request, res:Response)=>{
  try {
    
    res.clearCookie("refresh_token").status(200).send({status:true,message:"signout succesfull"});
  
  } catch (error) {
    res.status(500).send({status:false, message:"internal server error"})
  }
}