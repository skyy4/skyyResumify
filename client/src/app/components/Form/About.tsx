"use client";
import { StyledInput, StyledLabel } from "@/app/utils/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { instance } from "@/app/api/instance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { addPersonal } from "@/app/store/resumeSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const aboutSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" }),
  lastName: z.string({ required_error: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(10, "must be at least 10 characters"),
  objective: z.string({ required_error: "please mention your objective" }),
  designation: z.string(),
  address: z.string(),
  city: z.string(),
});

export type TAboutSchema = z.infer<typeof aboutSchema>;

const About = () => {
  const dispatch = useDispatch();
  const token = useSelector((state:RootState)=>state.token.token);
  const resumeId = useSelector((state:RootState)=>state.resumeToken.resumeId);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TAboutSchema>({
    resolver: zodResolver(aboutSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: TAboutSchema) => {
    try {
      const eduRes = await instance({
        url: `/personal`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          objective: data.objective,
          designation: data.designation,
          address: data.address,
          city: data.city,
          resumeId: resumeId
        },
      });
      
      if(eduRes.data.success){
        toast.success("Personal Data added successfully");
        dispatch(addPersonal(eduRes.data.personal));
      } else {
        toast.error("Error adding Personal Data");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const formVariants = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="text-gray-100">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          About Yourself
        </h2>
        <p className="text-gray-400 mt-1">
          Fill in your personal information to create a professional resume
        </p>
      </motion.div>

      <motion.form
        initial="initial"
        animate="animate"
        variants={formVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <StyledLabel htmlFor="firstName">First Name</StyledLabel>
            <StyledInput
              type="text"
              id="firstName"
              placeholder="John"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
            <StyledInput
              type="text"
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Designation */}
        <div className="space-y-1">
          <StyledLabel htmlFor="designation">Professional Title</StyledLabel>
          <StyledInput
            type="text"
            id="designation"
            placeholder="e.g. Software Engineer"
            {...register("designation")}
          />
          {errors.designation && (
            <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>
          )}
        </div>

        {/* Objective */}
        <div className="space-y-1">
          <StyledLabel htmlFor="objective">Career Objective</StyledLabel>
          <StyledInput
            type="text"
            id="objective"
            placeholder="Brief summary of your career goals"
            {...register("objective")}
          />
          {errors.objective && (
            <p className="text-red-400 text-xs mt-1">{errors.objective.message}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput
              type="email"
              id="email"
              placeholder="your.email@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <StyledLabel htmlFor="phoneNumber">Phone Number</StyledLabel>
            <StyledInput
              type="tel"
              id="phoneNumber"
              placeholder="Your phone number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-400 text-xs mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <StyledLabel htmlFor="city">City</StyledLabel>
            <StyledInput
              type="text"
              id="city"
              placeholder="Your city"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <StyledLabel htmlFor="address">Address</StyledLabel>
            <StyledInput
              type="text"
              id="address"
              placeholder="Your address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Save Personal Information
          </button>
        </div>
      </motion.form>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default About;
