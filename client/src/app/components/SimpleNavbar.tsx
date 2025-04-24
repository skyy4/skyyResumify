"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Mail, User, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signOut } from "../store/userSlice";
import { useRouter } from "next/navigation";
import { instance } from "../api/instance";
import { removeToken } from "../store/tokenSlice";
import { removeResume } from "../store/resumeTokenSlice";
import { motion } from "framer-motion";
import StarLogo from "./StarLogo";

const SimpleNavbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.token.token);
  const userDetails = useSelector((state: RootState) => state.users.currentUser);

  // Format username to show only first 4 characters + ellipsis
  const formatUsername = (username: string) => {
    if (!username) return "User";
    return username.length > 4 ? `${username.slice(0, 4)}..` : username;
  };

  // Get appropriate emoji for username
  const getUserEmoji = (username: string) => {
    if (!username) return "👤";
    // Use the first character of username to determine emoji (simple hashing)
    const charCode = username.charCodeAt(0);
    const emojis = ["🧑", "🤖", "✨", "🚀", "🌟", "🔮", "🎨", "📚", "🎓", "🎯", "💼", "🌈"];
    return emojis[charCode % emojis.length];
  };

  const handleSignOut = async () => {
    try {
      const data = await instance({
        url: "/signout",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (data.status) {
        dispatch(signOut());
        dispatch(removeToken());
        dispatch(removeResume());
        router.push("/signpage");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // If no user is logged in, return null (no navbar)
  if (!userDetails) {
    return null;
  }

  return (
    <motion.div 
      className="fixed z-10 top-0 w-full h-20 bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-lg shadow-lg border-b border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex items-center gap-2 text-2xl font-bold">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <StarLogo className="text-blue-400" size={32} />
            </motion.div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Resumify</span>
          </Link>

          <Link href="/" className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition-colors">
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Home size={20} />
            </motion.div>
          </Link>
        </div>
        
        <div className="relative">
          <motion.button
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 text-gray-100 border border-gray-700/50 focus:outline-none shadow-md"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{getUserEmoji(userDetails.username)}</span>
              <span className="font-medium bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {formatUsername(userDetails.username)}
              </span>
            </span>
            <ChevronDown size={18} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
          </motion.button>
          
          {userMenuOpen && (
            <motion.div 
              className="absolute right-0 mt-2 w-64 py-2 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-2 border-b border-gray-700/50 mb-1">
                <Link 
                  href="/cv-builder" 
                  className="flex items-center gap-2 text-sm text-gray-200 hover:text-blue-400"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Mail size={16} className="text-blue-400" />
                  <span className="truncate">{userDetails.email || "user@example.com"}</span>
                </Link>
              </div>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/70 hover:text-white"
              >
                <LogOut size={16} className="text-red-400" />
                Sign Out
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SimpleNavbar; 