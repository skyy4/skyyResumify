import { userSignUp } from "@/app/api/auth";
import { RootState } from "@/app/store/store";
import { setIsSignedUp, signUpFailure } from "@/app/store/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const signUpSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }).min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be less than 16 characters")
      .refine((value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(value), {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
    }),
    confirmPassword: z.string().min(8, "Confirm password is required").max(16)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type TSignUpShema = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.users.signedUpError);
  const [isErrorOccurred, setIsErrorOccured] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpShema>({ resolver: zodResolver(signUpSchema) });
  
  const onSubmit: SubmitHandler<TSignUpShema> = async (data) => {
    try {
      const signUpRes: any = await userSignUp(data);
      
      if (signUpRes?.status) {
        toast.success("Signed up successfully!");
        reset();
        setTimeout(() => dispatch(setIsSignedUp(true)), 1000);
      } else {
      dispatch(signUpFailure(signUpRes?.message));
      setIsErrorOccured(true);
        toast.error(signUpRes?.message || "Failed to sign up");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="block text-gray-300 text-sm font-medium">
            Username
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="relative"
          >
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              className={`w-full bg-gray-700/50 text-gray-100 border ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              {...register("username")}
            />
          </motion.div>
          {errors.username && (
            <motion.span 
              className="text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.username.message}
            </motion.span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-300 text-sm font-medium">
            Email
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="relative"
          >
            <input
            type="email"
              id="email"
              placeholder="your@email.com"
              className={`w-full bg-gray-700/50 text-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            {...register("email")}
          />
          </motion.div>
          {errors.email && (
            <motion.span 
              className="text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.email.message}
            </motion.span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-300 text-sm font-medium">
            Password
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="relative"
          >
            <input
            type="password"
              id="password"
              placeholder="••••••••"
              className={`w-full bg-gray-700/50 text-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            {...register("password")}
          />
          </motion.div>
          {errors.password && (
            <motion.span 
              className="text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.password.message}
            </motion.span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium">
            Confirm Password
          </label>
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="relative"
          >
            <input
            type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className={`w-full bg-gray-700/50 text-gray-100 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            {...register("confirmPassword")}
          />
          </motion.div>
          {errors.confirmPassword && (
            <motion.span 
              className="text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.confirmPassword.message}
            </motion.span>
          )}
        </div>
      </div>
      
      {isErrorOccurred && (
        <motion.div 
          className="py-2 px-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {errorMessage}
        </motion.div>
      )}
      
      <motion.button
              type="submit"
        disabled={isSubmitting}
        className="mt-2 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <UserPlus size={18} />
             Sign up
          </span>
        )}
      </motion.button>
    </motion.form>
  );
};

export default SignUp;
