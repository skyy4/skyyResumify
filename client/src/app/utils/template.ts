import {Sparkles,ShieldPlus, HandMetal, ShieldCheck ,LucideIcon } from "lucide-react";
 
interface ResumeProps{
    name:string;
    icon:LucideIcon;
    description:string;
    to:string;
    image?:string;
}
export const resumeTemplate:ResumeProps[]=[
    {
        name:"simple",
        icon:Sparkles,
        description:"Elegant minimalism with purposeful white space. Perfect for professionals seeking clarity and impact without excessive ornamentation. Lets your experience speak for itself.",
        to :"/simple",
        image:"/images/creative.png"
    },
    {
        name:"Professional",
        icon:ShieldPlus,
        description:"Strategic layout optimized for applicant tracking systems. Structured sections and formal presentation ideal for corporate roles, government positions, and traditional industries.",
        to :"/professional",
        image:"/images/professional.jpg"
    },
    {
        name:"Creative",
        icon:HandMetal ,
        description:"Bold design with visual flair and dynamic elements. Showcases your personality while maintaining readability. Ideal for marketing, design, arts, and media positions.",
        to :"/creative",
        image:"/images/simple.jpg"
    },
    {
        name:"Modern",
        icon:ShieldCheck ,
        description:"Contemporary aesthetic with clean lines and thoughtful typography. Balanced approach between creativity and professionalism. Perfect for tech, startups, and forward-thinking companies.",
        to :"/modern",
        image:"/images/modern.jpg"
    }
]