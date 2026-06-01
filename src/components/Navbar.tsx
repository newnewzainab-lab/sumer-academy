import React from "react";
import { GraduationCap, BookOpen, Home, Briefcase, Award, Milestone, Lightbulb, FileText, Building, Sparkles, LogOut, BrainCircuit } from "lucide-react";
import { Sumer3DLogo } from "./Sumer3DLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  microOnboarding: boolean;
  setMicroOnboarding: (val: boolean) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  interactiveGuidanceActive?: boolean;
  setInteractiveGuidanceActive?: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  microOnboarding,
  setMicroOnboarding,
  isLoggedIn,
  onLogout,
  interactiveGuidanceActive,
  setInteractiveGuidanceActive,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b-[6px] border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] text-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col items-center gap-4 w-full">
        
        {/* Navigation Tabs & Actions sitting on the exact same row/flow below the logo in a beautiful, premium frame/border */}
        <div className="w-full bg-slate-50/60 hover:bg-slate-50/90 border-2 border-slate-200/60 shadow-[inset_0_1.5px_4px_rgba(0,0,0,0.01),0_4px_20px_rgba(0,0,0,0.02)] rounded-[22px] p-3 md:p-4 flex flex-col lg:flex-row-reverse items-center justify-between gap-4 transition-all duration-300">
          
          {/* Brand Label with Sumerian Custom 3D Logo - Placed on the Right (RTL right-aligned) */}
          <div
            id="sumer_navbar_logo"
            className="flex items-center justify-center cursor-pointer group shrink-0 lg:ml-2"
            onClick={() => setActiveTab("home")}
          >
            <Sumer3DLogo size="md" />
          </div>

          {/* Main Tab Controller - Exactly matching requested tabs */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {[
              { id: "home", icon: Home, label: "الرئيسية" },
              { id: "early-childhood", icon: Sparkles, label: "التعليم المبكر للأطفال" },
              { id: "school", icon: BookOpen, label: "التعليم المدرسي" },
              { id: "university", icon: GraduationCap, label: "التعليم الجامعي" },
              { id: "postgrad", icon: Award, label: "الدراسات العليا" },
              { id: "continuous", icon: Briefcase, label: "التعليم المستمر" },
              { id: "ai-tools", icon: BrainCircuit, label: "أدوات الذكاء الاصطناعي" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-black text-xs cursor-pointer select-none ${
                    isActive
                      ? "bg-sumer-blue text-white border-b-4 border-sumer-gold shadow-[0_4px_0_#8c6723] translate-y-[-2px] active:translate-y-1"
                      : "bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700 active:translate-y-[1px]"
                  }`}
                >
                  <tab.icon size={13} className={isActive ? "text-sumer-gold" : "text-slate-500"} />
                  <span className="font-display font-black text-[11px] whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Micro-Onboarding toggle & Actions inside header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                const nextVal = !interactiveGuidanceActive;
                if (setInteractiveGuidanceActive) {
                  setInteractiveGuidanceActive(nextVal);
                  localStorage.setItem("sumer_guidance_active", nextVal ? "true" : "false");
                }
                setMicroOnboarding(nextVal);
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all cursor-pointer ${
                interactiveGuidanceActive
                  ? "bg-amber-100 text-amber-700 border-amber-400 shadow-[0_2px_0_#d97706] animate-pulse"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
              title="تفعيل الإرشاد التفاعلي الذكي"
            >
              💡 {interactiveGuidanceActive ? "الإرشاد نشط" : "دعم الإرشاد"}
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => setActiveTab("profile")}
                className="bg-gradient-to-b from-sumer-gold to-[#a98135] text-white px-4 py-2 border-b-4 border-[#8c6723] shadow-[0_3px_0_#674b17] rounded-xl font-black text-xs hover:scale-[1.03] active:translate-y-1 active:border-b-0 active:shadow-none transition-all cursor-pointer text-center whitespace-nowrap"
              >
                حسابي الطلابي
              </button>
            ) : (
              <button
                onClick={() => setActiveTab("profile")}
                className="bg-gradient-to-b from-sumer-blue to-[#081b2f] text-white px-4 py-2 border-b-4 border-slate-900 shadow-[0_3px_0_#040d17] rounded-xl font-black text-xs hover:scale-[1.03] active:translate-y-1 active:border-b-0 active:shadow-none transition-all cursor-pointer text-center whitespace-nowrap flex items-center gap-1.5"
              >
                <Sparkles size={12} className="text-sumer-gold" />
                <span>تسجيل الدخول</span>
              </button>
            )}

            {isLoggedIn && onLogout && (
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-slate-200 cursor-pointer"
                title="خروج من الحساب"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
        {interactiveGuidanceActive && (
          <div className="w-full max-w-5xl text-center pt-1 flex justify-center animate-pulse">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[10px] md:text-xs font-black rounded-full select-none text-right">
              💡 <strong>إرشاد:</strong> اضغط على الأقسام بالأعلى (التعليم المدرسي، الجامعي، المستمر، أو أدوات الذكاء الاصطناعي الـ 14) للانتقال الفوري إلى ميزات ومساقات المنصة ومزاياها!
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
