import axios from "axios";

//https://online-cv-builder.onrender.com

export const instance = axios.create({
    baseURL: "http://localhost:4000/api/users",
    withCredentials: true,
    
  });

 // http://localhost:4000