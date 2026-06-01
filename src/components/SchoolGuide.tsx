import React, { useState } from "react";
import { 
  GraduationCap, 
  MapPin, 
  Globe, 
  Search, 
  UserCheck, 
  Sparkles, 
  Building, 
  Mail, 
  HelpCircle, 
  ExternalLink,
  BookOpen,
  Phone
} from "lucide-react";
import { IRAQI_SCHOOLS, SchoolInfo, SchoolBranchInfo } from "../data/iraqiSchools";

interface SchoolGuideProps {
  onAskAI?: (question: string) => void;
}

export const SchoolGuide: React.FC<SchoolGuideProps> = ({ onAskAI }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("baghdad_college");
  const [selectedBranch, setSelectedBranch] = useState<SchoolBranchInfo | null>(IRAQI_SCHOOLS[0].branches[0]);

  // Search filter across schools and departments, integrated with province filtering
  const filteredSchools = IRAQI_SCHOOLS.filter(school => {
    // Province mapping match
    let matchesProvince = true;
    if (selectedProvince !== "all") {
      const lowerLoc = school.location.toLowerCase();
      const lowerName = school.name.toLowerCase();
      const prov = selectedProvince.toLowerCase();
      if (prov === "نينوى") {
        matchesProvince = lowerLoc.includes("نينوى") || lowerLoc.includes("الموصل") || lowerName.includes("mosul");
      } else {
        matchesProvince = lowerLoc.includes(prov) || lowerName.includes(prov);
      }
    }

    // Search query match
    const matchSchoolName = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchOverview = school.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBranch = school.branches.some(b => 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.introduction.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesProvince && (matchSchoolName || matchOverview || matchBranch);
  });

  // Handle active school selection dynamically & safely
  const selectedSchool = filteredSchools.find(s => s.id === selectedSchoolId) || filteredSchools[0] || null;

  // Keep branch synchronization active
  React.useEffect(() => {
    if (selectedSchool) {
      const hasBranch = selectedSchool.branches.some(b => b.name === selectedBranch?.name);
      if (!hasBranch && selectedSchool.branches.length > 0) {
        setSelectedBranch(selectedSchool.branches[0]);
      }
    } else {
      setSelectedBranch(null);
    }
  }, [selectedSchool, selectedBranch]);

  const handleSchoolClick = (id: string) => {
    setSelectedSchoolId(id);
    const school = IRAQI_SCHOOLS.find(s => s.id === id);
    if (school && school.branches.length > 0) {
      setSelectedBranch(school.branches[0]);
    } else {
      setSelectedBranch(null);
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    
    // Auto focus the first school match for the newly selected province to keep UX continuous
    const matches = IRAQI_SCHOOLS.filter(school => {
      if (province === "all") return true;
      const lowerLoc = school.location.toLowerCase();
      const lowerName = school.name.toLowerCase();
      const prov = province.toLowerCase();
      if (prov === "نينوى") {
        return lowerLoc.includes("نينوى") || lowerLoc.includes("الموصل") || lowerName.includes("mosul");
      }
      return lowerLoc.includes(prov) || lowerName.includes(prov);
    });

    if (matches.length > 0) {
      setSelectedSchoolId(matches[0].id);
      if (matches[0].branches.length > 0) {
        setSelectedBranch(matches[0].branches[0]);
      } else {
        setSelectedBranch(null);
      }
    }
  };

  const askAboutBranch = (branchName: string, schoolName: string) => {
    if (onAskAI) {
      onAskAI(`أريد معرفة تفاصيل كاملة ودليل القبول والتعليم لـ ${branchName} في ${schoolName}، بما في ذلك المدرسين والكتب المنهجية وحل أسئلة البكالوريا والوزاري.`);
    }
  };

  return (
    <div className="space-y-8 text-right font-sans min-h-screen" id="school-guide">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-[#031e42] via-[#0A2E5C] to-indigo-950 text-white p-8 md:p-10 rounded-[32px] border-t-2 border-l-2 border-r-2 border-b-[8px] border-indigo-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider">
            <Sparkles size={11} /> المدارس للمتميزين والمتفوقين والثانويات النموذجية العريقة
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-black leading-tight">
            دليلك المدرسي والتربوي العراقي الموحد 🇮🇶
          </h1>
          <p className="text-xs text-slate-300 max-w-4xl leading-relaxed font-bold">
            البوابة الاستكشافية الشاملة للمدارس الإعدادية العريقة ومدارس المتميزين والمتفوقين في كافة المحافظات العراقية. تصفح فروع الدراسة العلمية والأدبية والمشاريع التقنية المتاحة، وتعرف على الكادر التدريسي البارز لحصص البكالوريا، مدمج مباشرة مع معالج التوجيه بالذكاء الاصطناعي لسومر.
          </p>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Right Side: Search, Filter dropdown, and Schools List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-2 justify-start">
              <Search size={15} className="text-[#EF6C00]" /> ابحث عن مدرسة أو معهد تربوي
            </h3>
            
            {/* Search Input Box */}
            <div className="relative">
              <input 
                type="text"
                placeholder="كلية بغداد، ثانوية المتميزين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#0A2E5C] rounded-xl pl-4 pr-10 py-3 text-xs text-slate-800 outline-none font-bold text-right shadow-inner"
              />
              <Search size={14} className="absolute top-3.5 right-3.5 text-slate-400" />
            </div>

            {/* Geographical Province Filter Dropdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black text-slate-500 block text-right flex items-center gap-1 justify-start">
                <span>📍</span> تصفية حسب المحافظة الدراسية:
              </label>
              <div className="relative">
                <select
                  value={selectedProvince}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0A2E5C] rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none font-black text-right appearance-none cursor-pointer shadow-sm transition-all focus:ring-2 focus:ring-[#0A2E5C]/10"
                >
                  <option value="all">كل المحافظات العراقية 🇮🇶</option>
                  <option value="بغداد">بغداد (العاصمة) 🏰</option>
                  <option value="نينوى">نينوى (الموصل) 🌄</option>
                  <option value="البصرة">البصرة (الفيحاء) ⚓</option>
                  <option value="كركوك">كركوك (التآخي) 🪵</option>
                  <option value="صلاح الدين">صلاح الدين (تكريت) 🕌</option>
                </select>
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Left Navigation: Schools Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0A2E5C] px-1">القائمة المستكشفة للمدارس ({filteredSchools.length}):</h4>
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => {
                const isSelected = selectedSchool && school.id === selectedSchoolId;
                return (
                  <div
                    key={school.id}
                    onClick={() => handleSchoolClick(school.id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-right relative overflow-hidden ${
                      isSelected 
                        ? "bg-[#0A2E5C] border-transparent text-white shadow-xl shadow-[#0A2E5C]/15 scale-[1.02]" 
                        : "bg-white border-slate-150 text-slate-800 hover:bg-slate-50 hover:-translate-y-0.5"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/5 rounded-full" />
                    )}
                    <h5 className="font-extrabold text-xs md:text-sm leading-tight flex items-center gap-1.5 justify-start">
                      <span>🏛️</span> {school.name.split("(")[0].trim()}
                    </h5>
                    
                    <div className="flex items-center gap-2 pt-1 border-t border-dashed mt-2 text-[9px] font-mono leading-none">
                      <span className={isSelected ? "text-amber-300 font-extrabold" : "text-[#EF6C00] font-bold"}>
                        📍 {school.location.split("-")[0].trim()}
                      </span>
                      <span className="opacity-40">|</span>
                      <span className={isSelected ? "text-slate-300" : "text-slate-400"}>
                        {school.branches.length} فروع ومشاريع
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50 border border-slate-100 text-slate-500 p-6 rounded-2xl text-xs text-center font-bold">
                لم نجد أي مدرسة تطابق بحثك أو تصفية المحافظة الحالية.
              </div>
            )}
          </div>
        </div>

        {/* Left Side: Selected School and Branches Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {selectedSchool ? (
            /* School Main Info Frame */
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <h2 className="text-lg md:text-xl font-display font-black text-[#0A2E5C]">
                    {selectedSchool.name}
                  </h2>
                  <a 
                    href={`https://${selectedSchool.website}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#0A2E5C]/10 text-[#0A2E5C] text-[10px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Globe size={11} /> موقع المدرسة <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {selectedSchool.overview}
                </p>
              </div>

              {/* Micro details row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">📍 الرقعة التربوية:</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1 justify-start">
                    <MapPin size={12} className="text-[#EF6C00]" /> {selectedSchool.location}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">☎ قنوات التواصل والبريد:</span>
                  <span className="text-slate-800 font-bold font-mono flex items-center gap-1 justify-start">
                    <Mail size={12} className="text-[#EF6C00]" dir="ltr" /> {selectedSchool.contact}
                  </span>
                </div>
              </div>

              {/* Branches Tab Controller */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#0A2E5C] border-b border-slate-100 pb-2">
                  📋 الفروع والأقسام والنوادي المتوفرة في أدلتنا:
                </h3>
                
                <div className="flex gap-2 flex-wrap">
                  {selectedSchool.branches.map((b, idx) => {
                    const isBranchSelected = selectedBranch?.name === b.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedBranch(b)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          isBranchSelected 
                            ? "bg-[#EF6C00] text-white shadow-md shadow-orange-500/10 scale-105" 
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Individual Selected Branch detailed representation */}
              {selectedBranch ? (
                <div className="border border-slate-150 rounded-2xl p-5 md:p-6 space-y-6 mt-6 bg-gradient-to-b from-white to-slate-50/20">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#EF6C00] font-black uppercase tracking-widest block">الدورة / الفرع الحالي</span>
                      <h3 className="text-sm md:text-base font-black text-[#0A2E5C] flex items-center gap-2">
                        <Building size={16} className="text-[#EF6C00]" /> {selectedBranch.name}
                      </h3>
                    </div>
                    
                    <button
                      onClick={() => askAboutBranch(selectedBranch.name, selectedSchool.name)}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#0A2E5C] to-indigo-900 hover:scale-[1.03] active:scale-95 text-white rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sparkles size={13} className="text-amber-400" /> اسأل الذكاء الاصطناعي عن الفرع
                    </button>
                  </div>

                  {/* Branch Introduction */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-[#0A2E5C]">✏️ نبذة عن آلية التعليم والمناهج:</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {selectedBranch.introduction}
                    </p>
                  </div>

                  {/* Left block and Right block detailers */}
                  <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2.5">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start">
                        <UserCheck size={14} className="text-[#EF6C00]" /> معلمو ومستشارو البكالوريا المشرفون:
                      </h4>
                      <ul className="space-y-1.5 pr-2">
                        {selectedBranch.teachers.map((p, i) => (
                          <li key={i} className="text-[11px] text-slate-700 leading-normal flex items-start gap-1 justify-start">
                            <span className="text-[#EF6C00] font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2.5">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start">
                        <BookOpen size={14} className="text-[#EF6C00]" /> تفاصيل تربوية ومميزات الدليل:
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {selectedBranch.additionalDetails || "لا توجد تفاصيل تربوية إضافية مسجلة بالدليل الكلاسيكي. استعمل زر مستشار وسؤال الذكاء الاصطناعي لاستكشاف حلول أسئلة البكالوريا."}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-start gap-2 pt-2">
                    <HelpCircle size={12} />
                    <span>مخرجات هذا الدليل مرخصة ومطابقة للهيكل الفني لوزارة التربية العراقية لعام 2026.</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-150 p-8 rounded-2xl text-center text-xs text-slate-500 font-bold">
                  الرجاء تحديد فرع أو مادة من القائمة أعلاه لعرض التفاصيل المنهجية.
                </div>
              )}
            </div>
          ) : (
            /* Safe Fallback UI if all schools are filtered out */
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-12 shadow-xl text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <Building size={32} />
              </div>
              <h3 className="text-base font-black text-slate-800">لا توجد مدارس تطابق البحث أو خيارات التصفية</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                يرجى تجربة اختيار محافظة أخرى أو كسر كلمات البحث لتفقد المدراس العراقية المتوفرة بالدليل.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
