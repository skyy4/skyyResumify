"use client";
import React, { useEffect, useState } from "react";
import SignIn from "./sign-component/signIn";
import SignUp from "./sign-component/signUp";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setIsSignedUp,
  signInFailure,
  signInSuccess,
} from "../store/userSlice";
import { setToken } from "../store/tokenSlice";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { Brain } from 'lucide-react';
import { motion } from "framer-motion";
import StarLogo from "../components/StarLogo";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isSignedUp = useSelector((state: RootState) => state.users.isSignedUp);
  const userDetails = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (userDetails?.currentUser) {
      router.push("/");
    }
  }, [router, userDetails?.currentUser]);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
      {/* Animated cloud-like shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 left-[10%] w-[300px] h-[300px] rounded-full bg-gray-700/30 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-[15%] w-[250px] h-[250px] rounded-full bg-gray-600/20 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
              />
        <motion.div
          className="absolute bottom-1/4 left-[20%] w-[400px] h-[400px] rounded-full bg-gray-700/30 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Logo header for sign page only */}
      <motion.div 
        className="fixed z-10 top-0 w-full h-20 bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-700"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 h-full flex items-center">
          <Link href={"/"} className="flex items-center gap-2 text-2xl font-bold">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
                >
              <StarLogo className="text-blue-400" size={32} />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Resumify</span>
          </Link>
        </div>
      </motion.div>
      
      {/* Form container */}
      <div className="relative pt-32 pb-16 flex justify-center items-center min-h-screen px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-8 w-full"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isSignedUp ? "Welcome Back" : "Create Your Account"}
            </motion.h2>
            
          {isSignedUp ? <SignIn /> : <SignUp />}

            <motion.div 
              className="flex flex-row gap-2 justify-center mt-6 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
            <p>
              {!isSignedUp
                ? "Already have an account?"
                  : "Don't have an account?"}
            </p>
            <button
              onClick={() => dispatch(setIsSignedUp(!isSignedUp))}
                className="outline-none text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
                {isSignedUp ? "Sign up" : "Sign in"}
            </button>
            </motion.div>
          </motion.div>
        </motion.div>
        <ToastContainer 
          position="top-right"
          autoClose={4000}
          theme="dark"
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default Page;
