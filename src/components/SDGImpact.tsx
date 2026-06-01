import React, { useState, useEffect } from "react";
import { BarChart3, Globe, Heart, CheckCircle2, Award } from "lucide-react";

export const SDGImpact: React.FC = () => {
  const [hoursLearned, setHoursLearned] = useState(142510);
  const [moneySaved, setMoneySaved] = useState(850060000); // IQD

  // Simulate gentle incremental impact to model a live national application
  useEffect(() => {
    const timer = setInterval(() => {
      setHoursLearned((h) => h + Math.floor(Math.random() * 3) + 1);
      setMoneySaved((m) => m + Math.floor(Math.random() * 1500) + 500);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-sumer-blue to-blue-950 text-white rounded-[40px] p-8 md:p-14 shadow-2xl my-16 text-right relative overflow-hidden">
      {/* Visual Ambient Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sumer-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 justify-start lg:justify-end">
            <span className="bg-sumer-gold text-white font-bold text-xs uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
              <Heart size={12} className="fill-white" /> أهداف التنمية المستدامة (SDGs)
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            تعليم مجاني بالكامل <span className="text-sumer-gold">100% Free</span> مدى الحياة لمساندة الأسرة العراقية
          </h2>

          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            التزاماً بالرسالة الإنسانية الرامية لإتاحة المعرفة المتقدمة وتذليل العقبات المادية، تقدم "أكاديمية سومر" جميع دوراتها الأكاديمية والمدرسية والمهنية وأدوات الذكاء الاصطناعي مجاناً للجميع بدون أي تكاليف خفية، مساهمة في سد فجوات الفوارق المجتمعية العميقة.
          </p>

          {/* SDG Goals Highlights */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4 text-right">
              <div className="w-10 h-10 bg-sumer-gold/20 rounded-xl flex items-center justify-center text-sumer-gold shrink-0">
                <span className="font-bold text-lg">4</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-sumer-gold">الهدف الرابع: التعليم الجيد</h4>
                <p className="text-xs text-blue-200 mt-1">
                  ضمان التعليم الشامل والمنصف للجميع بكافة مراحل الإعدادية، البكالوريوس، والتخصص المهني.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-start gap-4 text-right">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                <span className="font-bold text-lg">10</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-blue-300">الهدف العاشر: الحد من عدم المساواة</h4>
                <p className="text-xs text-blue-200 mt-1">
                  تذليل الفروقات الاقتصادية والجغرافية بتقديم حقائب تدريبية موحدة لجميع محافظات العراق وأقضيتها.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Counter Dashboard Card */}
        <div className="lg:col-span-5 bg-slate-900 text-[#f1f5f9] p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col justify-between h-full border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              🟢 مؤشرات الأثر النشطة حالياً في العراق
            </span>
            <BarChart3 size={18} className="text-amber-400" />
          </div>

          <div className="space-y-6 flex-1">
            {/* Hours Counter */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 block">إجمالي ساعات التعلم الممنوحة بنجاح</span>
              <div className="text-3xl md:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                {hoursLearned.toLocaleString()} <span className="text-sm font-sans font-medium text-slate-300">ساعة</span>
              </div>
            </div>

            {/* Money Saved Counter */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 block">التوفير المالي التقديري للأسر والطلبة العراقيين</span>
              <div className="text-3xl md:text-3xl font-mono font-bold text-emerald-400">
                {moneySaved.toLocaleString()} <span className="text-xs font-sans font-medium text-slate-400">دينار عراقي</span>
              </div>
            </div>

            {/* Provinces reached */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">المحافظات النشطة</span>
                <span className="text-base font-bold text-amber-300">18 محافظة وعموم الأقضية</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">شهادات مدعومة مجاناً</span>
                <span className="text-base font-bold text-amber-300">24,500+ شهادة مفكوكة</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>حق التمكين المعرفي للبلد</span>
            <Globe size={14} className="text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
