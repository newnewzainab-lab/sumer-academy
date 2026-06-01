import React, { useState } from "react";
import { Network, Sparkles, HelpCircle, ArrowRightLeft, BookOpen, RefreshCw } from "lucide-react";

export const AIMindMap: React.FC = () => {
  const [topic, setTopic] = useState("المحرك الميكانيكي رباعي الأشواط");
  const [activeConcept, setActiveConcept] = useState<string | null>(null);

  // Sample static mapping database representing different study directions
  const minMapDatabase: Record<string, any> = {
    "المحرك الميكانيكي رباعي الأشواط": {
      centralNode: "المحرك رباعي الأشواط",
      description: "المحرك الحراري الأكثر استخداماً في السيارات والآلات العراقية الصناعية.",
      branches: [
        {
          title: "شوط السحب (Intake)",
          desc: "يفتح صمام السحب، ويتحرك المكبس لأسفل لسحب خليط الهواء والوقود الصافي العراقي.",
          subNodes: ["صمام السحب نشط", "ضغط الغرفة منخفض"],
        },
        {
          title: "شوط الضغط (Compression)",
          desc: "تغلق الصمامات بالكامل، ويرتفع المكبس لرفع الضغط والحرارة استعداداً للشرارة.",
          subNodes: ["غرفة احتراق مغلقة", "تراكم الضغط الهيدروليكي"],
        },
        {
          title: "شوط الانفجار (Power)",
          desc: "تطلق شمعة الاحتراق (اللكد) شرارة كهربائية تفجر المزيج دافعة المكبس بقوة شديدة.",
          subNodes: ["إنتاج عزم الدوران", "مرفق الحركة يدور"],
        },
        {
          title: "شوط العادم (Exhaust)",
          desc: "يفتح صمام العادم ليتخلص المكبس الصاعد من الغاز المحترق خارج الدائرة الهندسية.",
          subNodes: ["فتح منفذ العادم", "تنظيف الغرفة"],
        },
      ],
    },
    "أركان العقد القانوني في المحاكم العراقية": {
      centralNode: "أركان العقد القانوني",
      description: "القواعد الإلزامية لانعقاد وسلامة العقود المدنية والتجارية العراقية.",
      branches: [
        {
          title: "الركن الأول: التراضي",
          desc: "تطابق الإرادتين (الإيجاب والقبول) الصادرين من أطراف العقد بكامل الصحة.",
          subNodes: ["إيجاب وقبول موثق", "خالٍ من العيوب والإكراه"],
        },
        {
          title: "الركن الثاني: المحل",
          desc: "الشيء الذي يلتزم الطرفان بتقديمه أو القيام به، ويجب أن يكون مشروعاً وممكناً.",
          subNodes: ["موجود أو قابل للوجود", "متوافق مع النظام العام العراقي"],
        },
        {
          title: "الركن الثالث: السبب",
          desc: "الباعث الدافع للتعاقد والمقصد المباشر لكل طرف من القيام بالمعاملة المالية.",
          subNodes: ["سبب مشروع قانوناً", "المنفعة المتبادلة"],
        },
      ],
    },
    "توصيلات شبكات الإنترنت والموجهات": {
      centralNode: "الشبكات اللاسلكية والموجهات",
      description: "آلية انتقال النبضات اللاسلكية وتوجيه المسار في مقاسم الإنترنت العراقية.",
      branches: [
        {
          title: "الطبقة الفيزيائية (Physical)",
          desc: "كابلات الألياف الضوئية وإشارات الراديو الناقلة للحزم الضوئية.",
          subNodes: ["ترددات 2.4 - 5 جيجاهرتز", "كابلات النحاس والفيبر"],
        },
        {
          title: "طبقة التوجيه (Network Routing)",
          desc: "تحديد أفضل معبر للحزمة الإلكترونية باستخدام عناوين IP الفريدة.",
          subNodes: ["بروتوكول تحصيل العناوين ARP", "خوارزمية OSPF للمسار"],
        },
        {
          title: "طبقة التطبيق (Application Gate)",
          desc: "الواجهات البرمجية والتطبيقات التي يتعامل الطالب معها مباشرة كالمواقع.",
          subNodes: ["بروتوكولات التصفح HTTPS", "توزيع النطاق DNS"],
        },
      ],
    },
  };

  const currentMap = minMapDatabase[topic] || minMapDatabase["المحرك الميكانيكي رباعي الأشواط"];

  return (
    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100/80 text-right">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sumer-gold/15 text-sumer-gold rounded-xl flex items-center justify-center">
            <Network size={22} />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-sumer-blue">
              خارطة المفاهيم الرسومية والمخططات التلقائية
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              يحلل المحتوى الأكاديمي ويقوم بنسج تراكيب بصرية تبرز الروابط المتكاملة لتنسيق الفهم المنظم
            </p>
          </div>
        </div>
        <span className="bg-sumer-blue/10 text-sumer-blue text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <BookOpen size={12} /> تحليل شجري بصري
        </span>
      </div>

      {/* Select Predefined Topics */}
      <div className="space-y-4 mb-8">
        <label className="block text-xs font-bold text-gray-400">اختر مادة أكاديمية لتحليل خارطتها الذهنية:</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(minMapDatabase).map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopic(t);
                setActiveConcept(null);
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                topic === t
                  ? "bg-sumer-gold text-white border-sumer-gold shadow"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Mindmap Interactive Canvas Renderer Layout */}
      <div className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-200/50 flex flex-col items-center relative overflow-hidden min-h-[420px]">
        {/* Ambient grid background pattern to simulate CAD / digital learning workspace */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

        {/* Central Core Circle Node */}
        <div className="relative z-10 bg-sumer-blue text-white px-8 py-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center max-w-xs border-2 border-sumer-blue mb-12">
          <span className="text-[10px] text-sumer-gold uppercase tracking-widest font-bold">النواة المقررة</span>
          <h4 className="font-bold text-base mt-1">{currentMap.centralNode}</h4>
          <p className="text-[10.5px] text-blue-100 mt-1 line-clamp-2 leading-relaxed font-semibold">
            {currentMap.description}
          </p>
        </div>

        {/* Level 1 Sibling Branches Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full z-10">
          {currentMap.branches.map((branch: any, idx: number) => {
            const isSelected = activeConcept === branch.title;
            return (
              <div
                key={idx}
                onClick={() => setActiveConcept(isSelected ? null : branch.title)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-sumer-gold shadow-lg ring-1 ring-sumer-gold"
                    : "bg-white border-gray-200 hover:border-sumer-blue/30 shadow-sm hover:shadow"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-md bg-sumer-blue/10 text-sumer-blue font-mono font-bold text-[10px] flex items-center justify-center">
                      M{idx + 1}
                    </span>
                    <span className="text-[10px] text-sumer-gold font-bold">فرع معتمد</span>
                  </div>

                  <h5 className="font-bold text-xs text-sumer-ink mb-1">{branch.title}</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                    {branch.desc}
                  </p>
                </div>

                {/* Level 2 child nodes when branch is triggered */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 animate-slide-up">
                    <span className="text-[9px] text-gray-400 font-bold block mb-1">تفكيك مكمل:</span>
                    {branch.subNodes.map((sub: string, subIdx: number) => (
                      <span
                        key={subIdx}
                        className="inline-block px-2.5 py-1 bg-gray-100 text-[10px] rounded-md text-gray-600 font-bold ml-1.5"
                      >
                        🧬 {sub}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 text-[9px] text-gray-400 font-bold text-left">
                  {isSelected ? "اضغط لإخفاء التفاصيل" : "اضغط لكشف التفاصيل الفنية"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
