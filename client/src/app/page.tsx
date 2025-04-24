"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, Star, Zap } from 'lucide-react';
import SimpleNavbar from "./components/SimpleNavbar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import StarLogo from "./components/StarLogo";
import { motion } from "framer-motion";

export default function Home() {
  const userDetails = useSelector((state: RootState) => state.users.currentUser);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <main className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-50">
      <SimpleNavbar />
      
      {/* Simple header with logo - only visible when NOT logged in */}
      {!userDetails && (
        <div className="w-full h-20 bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-700 flex items-center fixed top-0 left-0 z-10">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-2 text-2xl font-bold">
              <StarLogo className="text-blue-400" size={32} />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Resumify</span>
            </Link>
            <Link
              href={"/signpage"}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md text-gray-100 hover:from-blue-600 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section with Gradient Background */}
      <motion.div 
        className="w-full pt-32 pb-20 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-32 right-[20%] w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-[15%] w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content side */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              variants={fadeInUp}
            >
              <motion.div 
                className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full mb-6 border border-blue-400/20"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="flex items-center text-sm font-medium">
                  <Star size={14} className="mr-2" /> Professional Resume Builder
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Craft Your Story, Shape Your Future – Stand Out
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                At <span className="font-bold text-blue-300">Resumify</span>, we transform your professional experience into compelling narratives. Our expertly designed templates help showcase your unique talents and catch employers' attention.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href={"/resume"}
                  className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
                >
                  <span>Create Your Resume</span>
                  <ChevronRight size={18} className="ml-2" />
                </Link>
                
                <motion.div 
                  className="flex items-center gap-2 justify-center text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <span className="text-sm">
                    <span className="font-bold text-green-400">
                      {Math.ceil(Math.random() * 2000)}+ 
                    </span>{" "}
                    resumes created today
                  </span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right image side */}
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInUp}
            >
              <div className="relative mx-auto max-w-lg">
                {/* Main background gradient */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm -z-10 border border-white/10"
                  initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                
                {/* Secondary design elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/20 blur-md"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-purple-500/20 blur-md"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Decorative dots */}
                <div className="absolute -right-3 top-1/4 flex flex-col gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-blue-400"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                    />
                  ))}
                </div>
                
                <div className="absolute -left-3 bottom-1/4 flex flex-col gap-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                    />
                  ))}
                </div>
                
                {/* Secondary floating resume */}
                <motion.div
                  className="absolute top-12 -right-6 w-28 h-40 rounded-lg overflow-hidden shadow-lg border border-white/10 hidden md:block"
                  initial={{ opacity: 0, y: 20, rotate: 10 }}
                  animate={{ opacity: 1, y: 0, rotate: 6 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Image 
                    src="/images/resume2.jpg"
                    alt="Secondary resume"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-10 w-32 h-44 rounded-lg overflow-hidden shadow-lg border border-white/10 hidden md:block"
                  initial={{ opacity: 0, y: 20, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, rotate: -8 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Image 
                    src="/images/professional.jpg"
                    alt="Professional resume"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
                
                {/* Main resume container */}
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 z-10"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Shine effect overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-10 pointer-events-none"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '100%', opacity: 0.5 }}
                    transition={{ 
                      duration: 1.5,
                      delay: 0.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  />
                  
                  <Image
                    height={1200}
                    width={2000}
                    alt="Resume example"
                    src="/images/resume.jpg"
                    className="w-full h-auto shadow-inner transform transition-transform duration-5000"
                    priority
                    style={{ 
                      transformOrigin: "center center",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Features Section */}
      <motion.div 
        className="py-24 bg-gradient-to-b from-gray-900 to-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 text-lg font-bold mb-4 inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Elevate Your Career Journey
            </motion.span>
            <h2 className="text-4xl font-bold mb-4">
              Build a Resume That Opens Doors to Opportunities
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              The right resume can be the difference between being overlooked and being interviewed. 
              Our streamlined process helps you create polished, professional documents that highlight your strengths.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <StarLogo size={40} />,
                title: "Select Your Perfect Template",
                description: "Choose from our collection of ATS-friendly, professionally designed templates that capture recruiters' attention and showcase your qualifications effectively.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Zap size={40} className="text-yellow-400" />,
                title: "Customize With Precision",
                description: "Our intuitive editor makes it simple to tailor sections to your industry and experience level, highlighting your achievements and skills with impact.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <CheckCircle size={40} className="text-green-400" />,
                title: "Download & Apply Confidently",
                description: "Generate a polished, professional PDF ready to impress recruiters. Track your applications and watch as interview invitations arrive.",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:bg-gray-700/50 transition-all group"
                variants={fadeInUp}
              >
                <div className="mb-5">
                  <div className="p-3 inline-flex rounded-lg bg-gradient-to-br border border-gray-700 shadow-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-700/50">
                  <Link
                    href="/resume"
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Get Started
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
