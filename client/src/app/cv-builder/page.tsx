"use client";
import React, { useEffect, useRef, useCallback } from "react";
import FieldSideBar from "../components/FieldSideBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import FIeldSelector from "../components/FIeldSelector";
import CV from "@/app/template/SampleCv";
import { addResume, removeResume } from "../store/resumeSlice";
import { instance } from "../api/instance";
import useAuth from "../utils/authCheck";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "../store/userSlice";
import ProfessionalCV from "../template/Professional";
import html2pdf from "html2pdf.js";
import { Printer, Download, Pencil, Eye, AlertCircle } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Simple from "../template/Simple";
import Modern from "../template/Modern";
import SimpleNavbar from "../components/SimpleNavbar";
import { motion } from "framer-motion";

export interface PersonalData {
  firstName?: string;
  lastName?: string;
  designation?: string;
  objective?: string;
  email?: string;
  phoneNumber?: string;
  city?:string;
  address?:string;
}

//  interface Education {
//   id: number;
//   startedAt: string;
//   endedAt: string;
//   major: string;
//   institution: string;
//   country: string;
// }

//  interface Experience {
//   id: number;
//   startedAt: string;
//   endedAt: string;
//   country: string;
//   years: string;
//   designation: string;
//   company: string;
//   description: string;
// }



//  interface Achievement {
//   id: number;
//   title: string;
//   description: string;
// }

//  interface Award {
//   id: number;
//   title: string;
//   description: string;
// }

//  interface Training {
//   id: number;
//   title: string;
//   institution: string;
//   year: string;
// }
//  interface Project {
//   id: number;
//   title: string;
//   description: string;
//   link: string;
// }
const CvBuilder = () => {
  const desktop = useMediaQuery("(min-width:1024px)");
  const router = useRouter();
  const dispatch = useDispatch();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const token = useSelector((state: RootState) => state.token.token) as string;
  const resumeId = useSelector(
    (state: RootState) => state.resumeToken.resumeId
  ) as string;

  useAuth();
  const setResumeData = useCallback(async () => {
    if (!resumeId) {
      return router.push("/resume");
    }
    if (resumeId) {
     try {
      const { data } = await instance({
        url: `/resume/${resumeId}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        dispatch(addResume(data.resume));
      }
     } catch (error:any) {
      if(error.response.data.status===false){
        dispatch(removeResume());
        dispatch(signOut());
        router.push("/signpage")
      }
     }
    }
  }, [resumeId, router, token, dispatch]);
  useEffect(() => {
    setResumeData();
    return () => {
      dispatch(removeResume());
    };
  }, [resumeId, dispatch, setResumeData]);
  // const customStyles = {
  //   font: "Arial, sans-serif",
  //   // Other custom styles
  // };
  const resumeData = useSelector((state: RootState) => state.resume);

const template = resumeData?.templateName ;

let selectedTemplate;
switch (template) {
  case "simple":
    selectedTemplate = <Simple
    personalData={resumeData.personal}
    educationData={resumeData.education}
    experienceData={resumeData.experience}
    achievementsData={resumeData.acheivement}
    awardsData={resumeData.award}
    trainingData={resumeData.training}
    skillData={resumeData.skill}
    projectData={resumeData.project}

  />;
    break;
  case "Creative":
    selectedTemplate = <CV
    personalData={resumeData.personal}
    educationData={resumeData.education}
    experienceData={resumeData.experience}
    achievementsData={resumeData.acheivement}
    awardsData={resumeData.award}
    trainingData={resumeData.training}
    skillData={resumeData.skill}
    projectData={resumeData.project}
  
  />;
    break;

  case "Professional":
    selectedTemplate =  <ProfessionalCV
    personalData={resumeData.personal}
    educationData={resumeData.education}
    experienceData={resumeData.experience}
    achievementsData={resumeData.acheivement}
    awardsData={resumeData.award}
    trainingData={resumeData.training}
    skillData={resumeData.skill}
    projectData={resumeData.project}
    
  />
    break;
    case "Modern":
    selectedTemplate = <Modern
    personalData={resumeData.personal}
    educationData={resumeData.education}
    experienceData={resumeData.experience}
    achievementsData={resumeData.acheivement}
    awardsData={resumeData.award}
    trainingData={resumeData.training}
    skillData={resumeData.skill}
    projectData={resumeData.project}
  
  />;
    break;
  // case "Awards":
  //   selectedTemplate = <Professional />;
  //   break;
  // case "Trainings":
  //   selectedTemplate = <Trainings />;

  //   break;
  default:
    selectedTemplate = <CV
    personalData={resumeData.personal}
    educationData={resumeData.education}
    experienceData={resumeData.experience}
    achievementsData={resumeData.acheivement}
    awardsData={resumeData.award}
    trainingData={resumeData.training}
    skillData={resumeData.skill}
    projectData={resumeData.project}
   
  />;
}
 
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    const input = componentRef.current;
    if (input) {
      html2pdf().from(input).save(`resumify-${resumeData?.templateName || 'resume'}.pdf`);
    }
  };

  if (!desktop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle size={48} className="text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Desktop View Required</h2>
        <p className="text-gray-300 max-w-md">
          Please open Resumify on a desktop or laptop for the best resume building experience. The editor requires a larger screen for optimal use.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <SimpleNavbar />
      
      <div className="container mx-auto px-4 xl:px-6 pt-28 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-lg overflow-hidden">
          {/* Left Column: Sidebar and Form Area */}
          <div className="flex lg:w-[45%]">
            {/* Sidebar */}
            <div className="w-20 flex-shrink-0 bg-gray-800/70 border-r border-gray-700/50">
              <div className="sticky top-28">
                <FieldSideBar />
              </div>
            </div>
            
            {/* Form Area */}
            <div className="flex-1 py-6 pr-4 border-r border-gray-700/50 max-h-[calc(100vh-180px)] overflow-auto custom-scrollbar">
              <div className="sticky top-28">
                <FIeldSelector />
              </div>
            </div>
          </div>
          
          {/* Right Column: Preview Area */}
          <div className="lg:w-[55%] flex flex-col p-6">
            <div className="bg-gray-800/70 rounded-lg mb-6 flex justify-between items-center border border-gray-700/50 shadow-md overflow-hidden">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent px-6 py-4">
                Resume Preview
              </h2>
              
              <div className="flex items-center">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-4 border-l border-gray-700/50 text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  <Printer size={18} />
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Download size={18} />
                  <span className="font-medium">Download PDF</span>
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow-md overflow-auto custom-scrollbar p-3 border border-gray-700/30">
              <div ref={componentRef} className="w-full mx-auto bg-white">
                {selectedTemplate}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CvBuilder;
