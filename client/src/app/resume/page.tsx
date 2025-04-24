"use client";
import Link from "next/link";
import React, { useState } from "react";
import { LayoutPanelTop, ChevronRight, ArrowRight, PlusCircle, RefreshCw } from "lucide-react";
import { resumeTemplate } from "../utils/template";
import { instance } from "../api/instance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setResume } from "../store/resumeTokenSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import SimpleNavbar from "../components/SimpleNavbar";
import StarLogo from "../components/StarLogo";
import { motion } from "framer-motion";

const Page = () => {
  const dispatch = useDispatch();
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const router = useRouter();
  const token = useSelector((state: RootState) => state.token.token) as string;
  const userDetails = useSelector((state: RootState) => state.users.currentUser);
  const resumeId = useSelector(
    (state: RootState) => state.resumeToken.resumeId
  ) as string;

  const getResume = async (title: string) => {
    try {
      if (!token) {
        return router.push("/signpage");
      }
      if (!resumeId) {
        const { data } = await instance({
          url: `/resume?templateName=${title}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.success) {
          toast.success("Got your resume! Update it now!");
          dispatch(setResume(data.data._id));
          router.push("/cv-builder");
        }
      } else {
        router.push("/cv-builder");
      }
    } catch (error: any) {
      if (!error.response.data.success) {
        const { data } = await instance({
          url: `/resume`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            title: "Your Resume",
            templateName: title,
          },
        });

        if (data.success) {
          toast.success("Created! Good luck with your resume");
          dispatch(setResume(data.data._id));
          router.push("/cv-builder");
        }
      }
    }
  };

  const resumeHandler = async (title: string) => {
    try {
      if (!token) {
        return router.push("/signpage");
      }

      if (!resumeId) {
        return getResume(title);
      } else {
        const { data } = await instance({
          url: `/resume?templateName=${title}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            templateName: title,
          },
        });
        if (data.success) {
          toast.success("Got your resume! Update it now!");
          dispatch(setResume(data.data._id));
          router.push("/cv-builder");
        }
      }
    } catch (error: any) {
      if (!error.response.data.success) {
        const { data } = await instance({
          url: `/resume`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            title: "Your Resume",
            templateName: title,
          },
        });

        if (data.success) {
          toast.success("Created! Good luck with your resume");
          dispatch(setResume(data.data._id));
          router.push("/cv-builder");
        }
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* SimpleNavbar for logged-in users */}
      <SimpleNavbar />
      
      {/* Basic header for logged-out users */}
      {!userDetails && (
        <div className="w-full h-20 bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700 fixed top-0 left-0 z-10 flex items-center">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-2 text-2xl font-bold">
              <StarLogo className="text-blue-400" size={32} />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Resumify</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href={"/"}
                className="px-4 py-2 text-gray-300 hover:text-white transition-all"
              >
                Home
              </Link>
              <Link
                href={"/signpage"}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md text-gray-100 hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-6 pt-32 pb-24">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full mb-4 border border-blue-400/20 text-sm font-medium">
              Resume Templates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Choose Your Resume Template
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Each template is expertly designed to help you stand out. Make a strong impression with a professional, customizable resume.
            </p>
          </motion.div>

          {/* Quick action button */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <button
              onClick={() => getResume("simple")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center group"
            >
              {resumeId ? (
                <>
                  <RefreshCw size={18} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Update Your Current Resume</span>
                </>
              ) : (
                <>
                  <PlusCircle size={18} className="mr-2" />
                  <span>Create Your First Resume</span>
                </>
              )}
            </button>
          </motion.div>
          
          {/* Template categories */}
          <motion.div 
            variants={itemVariants}
            className="relative mb-10 flex justify-center items-center"
          >
            <div className="absolute w-full border-t border-gray-700/50 top-1/2 transform -translate-y-1/2"></div>
            <div className="bg-gray-800 rounded-xl border border-gray-700/50 z-10 flex items-center justify-center flex-wrap gap-3 p-4 shadow-lg">
              <button
                onClick={() => setSelectedTemplate(null)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${!selectedTemplate 
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              >
                <LayoutPanelTop size={16} />
                <span>All Templates</span>
              </button>
              
              {resumeTemplate.map((resume, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTemplate(resume.name)}
                  className={`flex items-center gap-2 capitalize px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${selectedTemplate === resume.name 
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  <resume.icon size={16} />
                  <span>{resume.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Template grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {resumeTemplate
              .filter(temp => !selectedTemplate || temp.name === selectedTemplate)
              .map((template, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-xl hover:shadow-blue-500/20 transition-all group cursor-pointer"
                  onClick={() => resumeHandler(template.name)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900/0 to-gray-900/90 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          resumeHandler(template.name);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      >
                        <span>Use This Template</span>
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                    
                    <Image
                      alt={`${template.name} template`}
                      width={500}
                      height={700}
                      src={template.image as string}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Selected indicator */}
                    {selectedTemplate === template.name && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 border-t border-gray-700/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold capitalize text-white mb-1 group-hover:text-blue-300 transition-colors">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                      
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          resumeHandler(template.name);
                        }}
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-blue-500 transition-colors"
                      >
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>

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
    </div>
  );
};

export default Page;
