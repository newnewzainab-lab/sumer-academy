import React, { useState } from "react";
import { 
  GraduationCap, 
  MapPin, 
  Globe, 
  PhoneCall, 
  Search, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  Building, 
  Mail, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { IRAQI_UNIVERSITIES, UniversityInfo, CollegeInfo } from "../data/iraqiUniversities";

interface UniversityGuideProps {
  onAskAI?: (question: string) => void;
}

export const UniversityGuide: React.FC<UniversityGuideProps> = ({ onAskAI }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedUniId, setSelectedUniId] = useState<string>("baghdad");
  const [selectedCollege, setSelectedCollege] = useState<CollegeInfo | null>(IRAQI_UNIVERSITIES[0].colleges[0]);

  // Search filter across universities and colleges, integrated with province filtering
  const filteredUniversities = IRAQI_UNIVERSITIES.filter(uni => {
    // Province mapping match
    let matchesProvince = true;
    if (selectedProvince !== "all") {
      const lowerLoc = uni.location.toLowerCase();
      const lowerName = uni.name.toLowerCase();
      const prov = selectedProvince.toLowerCase();
      if (prov === "نينوى") {
        matchesProvince = lowerLoc.includes("نينوى") || lowerLoc.includes("الموصل") || lowerName.includes("mosul");
      } else {
        matchesProvince = lowerLoc.includes(prov) || lowerName.includes(prov);
      }
    }

    // Search query match
    const matchUniName = uni.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchUniOverview = uni.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCollege = uni.colleges.some(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.introduction.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesProvince && (matchUniName || matchUniOverview || matchCollege);
  });

  // Handle active university selection dynamically & safely
  const selectedUni = filteredUniversities.find(u => u.id === selectedUniId) || filteredUniversities[0] || null;

  // Keep college synchronization active
  React.useEffect(() => {
    if (selectedUni) {
      const hasCollege = selectedUni.colleges.some(c => c.name === selectedCollege?.name);
      if (!hasCollege && selectedUni.colleges.length > 0) {
        setSelectedCollege(selectedUni.colleges[0]);
      }
    } else {
      setSelectedCollege(null);
    }
  }, [selectedUni, selectedCollege]);

  const handleUniClick = (id: string) => {
    setSelectedUniId(id);
    const uni = IRAQI_UNIVERSITIES.find(u => u.id === id);
    if (uni && uni.colleges.length > 0) {
      setSelectedCollege(uni.colleges[0]);
    } else {
      setSelectedCollege(null);
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    
    // Auto focus the first university match for the newly selected province to keep UX continuous
    const matches = IRAQI_UNIVERSITIES.filter(uni => {
      if (province === "all") return true;
      const lowerLoc = uni.location.toLowerCase();
      const lowerName = uni.name.toLowerCase();
      const prov = province.toLowerCase();
      if (prov === "نينوى") {
        return lowerLoc.includes("نينوى") || lowerLoc.includes("الموصل") || lowerName.includes("mosul");
      }
      return lowerLoc.includes(prov) || lowerName.includes(prov);
    });

    if (matches.length > 0) {
      setSelectedUniId(matches[0].id);
      if (matches[0].colleges.length > 0) {
        setSelectedCollege(matches[0].colleges[0]);
      } else {
        setSelectedCollege(null);
      }
    }
  };

  const askAboutCollege = (collegeName: string, uniName: string) => {
    if (onAskAI) {
      onAskAI(`أريد معرفة تفاصيل كاملة ودليل القبول لـ ${collegeName} في ${uniName}، بما في ذلك الأساتذة ومواقع الكلية وتخصصاتها.`);
    }
  };

  return (
    <div className="space-y-8 text-right font-sans min-h-screen" id="university-guide">
      
      {/* Visual Header Banner */}
      <div className="bg-gradient-to-r from-[#031e42] via-[#0A2E5C] to-indigo-950 text-white p-8 md:p-10 rounded-[32px] border-t-2 border-l-2 border-r-2 border-b-[8px] border-indigo-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-xl text-[10px] font-black uppercase tracking-wider">
            <Sparkles size={11} /> دليل القبول والجامعات العراقية الموحد
          </span>
          <h1 className="text-2xl md:text-3xl font-display font-black leading-tight">
            دليلك الجامعي العراقي الذكي
          </h1>
          <p className="text-xs text-slate-300 max-w-4xl leading-relaxed font-bold">
            اكبر بوابة استكشافية متكاملة للجامعات والمعاهد العراقية الحكومية والأهلية. يمكنك تصفح الكليات، تخصصاتها، كفاءتها العلمية، وعملية التواصل المباشر مع عمادات الكليات، أساتذتها، ومواقعها الجغرافية. مدمج بالكامل مع مستشار الذكاء الاصطناعي التفاعلي لحساب القبول.
          </p>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Right Side: Search, Filter dropdown, and Universities List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-lg space-y-4">
            <h3 className="text-xs font-black text-slate-800 flex items-center gap-2 justify-start">
              <Search size={15} className="text-[#EF6C00]" /> ابحث عن جامعة أو كلية
            </h3>
            
            {/* Search Input Box */}
            <div className="relative">
              <input 
                type="text"
                placeholder="جامعة بغداد، هندسة النفط..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#0A2E5C] rounded-xl pl-4 pr-10 py-3 text-xs text-slate-800 outline-none font-bold text-right shadow-inner"
              />
              <Search size={14} className="absolute top-3.5 right-3.5 text-slate-400" />
            </div>

            {/* Geographical Province Filter Dropdown */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black text-slate-500 block text-right flex items-center gap-1 justify-start">
                <span>📍</span> تصفية حسب المحافظة الجغرافية:
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

          {/* Left Navigation: Universities Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#0A2E5C] px-1">القائمة المستكشفة للجامعات ({filteredUniversities.length}):</h4>
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((uni) => {
                const isSelected = selectedUni && uni.id === selectedUniId;
                return (
                  <div
                    key={uni.id}
                    onClick={() => handleUniClick(uni.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden text-right select-none ${
                      isSelected 
                        ? "bg-[#0A2E5C] border-amber-500 text-white shadow-lg translate-x-[-4px]" 
                        : "bg-white border-slate-100 hover:border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 h-full w-2.5 bg-amber-500" />
                    )}
                    <div className="space-y-1.5 pr-2">
                      <h4 className="text-xs font-black flex items-center justify-start gap-1.5 leading-snug">
                        <GraduationCap size={15} className={isSelected ? "text-amber-400" : "text-slate-500"} />
                        {uni.name}
                      </h4>
                      <p className={`text-[10px] line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-500"} leading-relaxed font-semibold`}>
                        {uni.overview}
                      </p>
                      
                      <div className="flex items-center gap-2 pt-1 border-t border-dashed mt-2 text-[9px] font-mono leading-none">
                        <span className={isSelected ? "text-amber-300" : "text-[#EF6C00] font-bold"}>
                          📍 {uni.location.split("-")[0].trim()}
                        </span>
                        <span className="opacity-40">|</span>
                        <span className={isSelected ? "text-slate-300" : "text-slate-400"}>
                          {uni.colleges.length} كليات
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50 border border-slate-100 text-slate-500 p-6 rounded-2xl text-xs text-center font-bold">
                لم نجد أي جامعة تطابق بحثك أو تصفية المحافظة الحالية.
              </div>
            )}
          </div>
        </div>

        {/* Left Side: Selected University and Colleges Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {selectedUni ? (
            /* University Main Info Frame */
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <h2 className="text-lg md:text-xl font-display font-black text-[#0A2E5C]">
                    {selectedUni.name}
                  </h2>
                  <a 
                    href={`https://${selectedUni.website}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-[#0A2E5C]/10 text-[#0A2E5C] text-[10px] font-black rounded-lg cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Globe size={11} /> موقع الجامعة <ExternalLink size={10} />
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {selectedUni.overview}
                </p>
              </div>

              {/* Micro details row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">📍 الموقع الجغرافي:</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1 justify-start">
                    <MapPin size={12} className="text-[#EF6C00]" /> {selectedUni.location}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 block font-bold">☎ الاتصال والتواصل الموثق:</span>
                  <span className="text-slate-800 font-bold font-mono flex items-center gap-1 justify-start">
                    <Mail size={12} className="text-[#EF6C00]" /> {selectedUni.contact}
                  </span>
                </div>
              </div>

              {/* Colleges Tab Controller */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#0A2E5C] border-b border-slate-100 pb-2">
                  📋 الكليات التابعة المتوفرة في أدلتنا:
                </h3>
                
                <div className="flex gap-2 flex-wrap">
                  {selectedUni.colleges.map((col, idx) => {
                    const isColSelected = selectedCollege?.name === col.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedCollege(col)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          isColSelected 
                            ? "bg-[#EF6C00] text-white shadow-md shadow-orange-500/10 scale-105" 
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {col.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Individual Selected College detailed representation */}
              {selectedCollege ? (
                <div className="border border-slate-150 rounded-2xl p-5 md:p-6 space-y-6 mt-6 bg-gradient-to-b from-white to-slate-50/20">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#EF6C00] font-black uppercase tracking-widest block">الكلية المحددة</span>
                      <h3 className="text-sm md:text-base font-black text-[#0A2E5C] flex items-center gap-2">
                        <Building size={16} className="text-[#EF6C00]" /> {selectedCollege.name}
                      </h3>
                    </div>
                    
                    <button
                      onClick={() => askAboutCollege(selectedCollege.name, selectedUni.name)}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#0A2E5C] to-indigo-900 hover:scale-[1.03] active:scale-95 text-white rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Sparkles size={13} className="text-amber-400" /> اسأل الذكاء الاصطناعي عن الكلية
                    </button>
                  </div>

                  {/* College Introduction */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-[#0A2E5C]">✏️ نبذة وتعريف عن الكلية:</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {selectedCollege.introduction}
                    </p>
                  </div>

                  {/* Left block and Right block detailers */}
                  <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2.5">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start">
                        <UserCheck size={14} className="text-[#EF6C00]" /> الكادر والأساتذة البارزون:
                      </h4>
                      <ul className="space-y-1.5 pr-2">
                        {selectedCollege.professors.map((p, i) => (
                          <li key={i} className="text-[11px] text-slate-700 leading-normal flex items-start gap-1 justify-start">
                            <span className="text-[#EF6C00] font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-100 space-y-2.5">
                      <h4 className="text-[#0A2E5C] font-black flex items-center gap-1.5 justify-start">
                        <BookOpen size={14} className="text-[#EF6C00]" /> تفاصيل وأقسام إضافية:
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {selectedCollege.additionalDetails || "لا توجد تفاصيل إضافية مسجلة بالدليل الكلاسيكي. استعمل زر مستشار وسؤال الذكاء الاصطناعي لاستكشاف القبول والوزارات."}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-start gap-2 pt-2">
                    <HelpCircle size={12} />
                    <span>معلومات هذا الدليل موثقة ومطابقة لمجلس التعليم العراقي المتكامل لعام 2026.</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-150 p-8 rounded-2xl text-center text-xs text-slate-500 font-bold">
                  الرجاء تحديد كلية من القائمة أعلاه لعرض التفاصيل.
                </div>
              )}
            </div>
          ) : (
            /* Safe Fallback UI if all universities are filtered out */
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-12 shadow-xl text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <Building size={32} />
              </div>
              <h3 className="text-base font-black text-slate-800">لا توجد جامعات تطابق البحث أو خيارات التصفية</h3>
              <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                يرجى تجربة اختيار محافظة أخرى أو كتابة عبارة بحث مختلفة لاستكشاف الجامعات العراقية المتوفرة بالدليل.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
