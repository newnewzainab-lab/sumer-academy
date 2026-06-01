import React from "react";
import { GraduationCap } from "lucide-react";

interface Sumer3DLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Sumer3DLogo: React.FC<Sumer3DLogoProps> = ({ className = "", size = "md" }) => {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <div id="sumer_3d_logo_container" className={`flex items-center gap-3 select-none flex-row-reverse text-right ${className}`}>
      {/* Icon and Shield block */}
      <div 
        id="sumer_3d_shield"
        className={`relative flex items-center justify-center shrink-0 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 bg-gradient-to-br from-[#0c2540] to-[#1e3a8a] border-b-[4px] border-[#EF6C00] ${
          isSmall ? "w-10 h-10" : isLarge ? "w-16 h-16" : "w-12 h-12"
        }`}
      >
        {/* Inner symbol */}
        <GraduationCap 
          id="sumer_graduation_cap_icon"
          className="text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)] animate-pulse" 
          size={isSmall ? 18 : isLarge ? 32 : 24} 
        />
        
        {/* 3D Floating Badge */}
        <span 
          id="sumer_3d_badge"
          className="absolute -bottom-2 -right-1.5 bg-gradient-to-r from-[#EF6C00] to-orange-500 text-white font-extrabold rounded-md shadow-[0_2px_6px_rgba(239,108,0,0.4)] border border-white/20 select-none text-center px-1.5 py-0.5 tracking-tight text-[9px] animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          ٣دي
        </span>
      </div>

      {/* Typography and slogan */}
      <div id="sumer_typography_block" className="flex flex-col items-end gap-0.5">
        <h1 
          id="sumer_main_brand_title"
          className={`font-display font-black text-[#0A2E5C] leading-none tracking-tight ${
            isSmall ? "text-base" : isLarge ? "text-3xl" : "text-xl md:text-2xl"
          }`}
        >
          أكاديمية سومر
        </h1>
        <p 
          id="sumer_brand_sub_slogan"
          className="text-[#EF6C00] font-black uppercase tracking-wider text-[8px] md:text-[9px] text-right"
        >
          Sumer Hybrid Academy • عصر التعلم الذكي
        </p>
      </div>
    </div>
  );
};
