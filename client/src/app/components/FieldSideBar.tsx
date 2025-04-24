"use client"
import React from 'react'
import { FieldProps, fieldTemplate } from '../utils/Field'
import { setSelectedField } from '../store/fieldSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { motion } from 'framer-motion'

const FieldSideBar = () => {
  const fieldName = useSelector((state:RootState)=> state.field.selectedField);
  
  const dispatch = useDispatch();
  const handleFieldClick=(name:FieldProps["name"])=>{
   dispatch(setSelectedField(name));
   window.scrollTo({
    top: 80,
    behavior: 'smooth' // Smooth scrolling
   });
  }
  
  return (
    <div className="h-full py-8 flex flex-col gap-4 items-center">
      {fieldTemplate.map((field, index) => (
        <motion.div 
          key={index} 
          onClick={() => handleFieldClick(field.name)} 
          className={`w-14 h-14 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-1 transition-all
            ${field.name === fieldName 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-blue-300'}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
        >
          <field.icon size={18} />
          <span className="text-xs font-medium">{field.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default FieldSideBar