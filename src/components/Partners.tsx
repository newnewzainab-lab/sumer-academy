import React from "react";
import { Globe, Award, ShieldCheck, CheckSquare } from "lucide-react";

export const Partners: React.FC = () => {
  const alliances = [
    { name: "Google Cloud", type: "شراكة تقنية وتقييم ذكي", hue: "from-blue-500/10 to-blue-600/5", border: "border-blue-900/30" },
    { name: "Microsoft AI", type: "مناهج الحوسبة السحابية", hue: "from-teal-500/10 to-teal-600/5", border: "border-teal-900/30" },
    { name: "HP Life", type: "تعليم مالي وريادة أعمال مدمج", hue: "from-orange-500/10 to-orange-600/5", border: "border-orange-900/30" },
    { name: "Meta Blueprint", type: "تطوير التسويق الرقمي والنمو", hue: "from-indigo-500/10 to-indigo-600/5", border: "border-indigo-900/30" },
    { name: "Harvard DX", type: "مساقات التعليم الجامعي المفتوح", hue: "from-red-500/10 to-red-600/5", border: "border-red-900/30" },
    { name: "Stanford Online", type: "كفاءات الذكاء الاصطناعي التطبيقي", hue: "from-amber-500/10 to-amber-600/5", border: "border-amber-900/30" },
  ];

  return (
    <section className="bg-transparent py-20 border-t border-[#1e293b]/60">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            الريادة العالمية والشراكة الأكاديمية
          </span>
          <h2 className="text-3xl font-display font-black text-gray-100 mt-4 mb-3">
            تحالفاتنا وصلاحيات الاعتماد المستقبلية
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
            نعمل على ربط مسارات التعليم المدرسي، الجامعي، والمهني بأرقى تكنولوجيا عالمية، مدعومة بالشراكة الاستراتيجية مع{" "}
            <span className="text-amber-400 font-bold">نقابة المدربين العراقيين</span> ومراكز التطوير المهني الوطنية المعتمدة.
          </p>
        </div>

        {/* Global Hubs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {alliances.map((partner, index) => (
            <div
              key={index}
              className={`p-6 rounded-3xl border ${partner.border} bg-[#1e293b]/50 text-right hover:border-amber-500/50 transition-all flex flex-col justify-between`}
            >
              <div>
                <span className="text-xs text-amber-500 font-bold">تحالف مستقبلي</span>
                <h3 className="text-lg font-bold text-gray-100 mt-1 mb-2">
                  {partner.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  دمج مساقات وشهادات التدريب الأكثر تقدماً لتمكين الحاصلين عليها من ميزة التنافس في العراق وخارجه.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                <span>{partner.type}</span>
                <Globe size={14} className="text-amber-400 animate-spin-slow" />
              </div>
            </div>
          ))}
        </div>

        {/* Iraqi Foundations Trust */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center gap-8 justify-between text-right text-slate-100">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-400 flex items-center justify-start gap-2 mb-2">
              <ShieldCheck className="text-amber-500 shrink-0" />
              أرصفة الاعتماد الوطني والقبول الميداني المعتمد
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تلتزم كفاءات <span className="text-amber-300 font-bold">نقابة المدربين العراقيين</span> بتقديم حقائبهم التدريبية التخصصية والبرامج الهندسية والمهنية المتطورة ومشاريعهم الابتكارية عبر منصة إدراك سومر. جميع الشهادات الصادرة موثقة برقم تسلسلي وطني معتمد من النقابة ومربوطة مباشرة بملفك الشخصي لدعم قابليتك للتوظيف.
            </p>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-6 justify-center shrink-0">
            {/* High-Fidelity Vector Shield: Iraqi Trainers Union */}
            <div className="bg-[#0f172a] border border-emerald-500/30 p-4 rounded-2xl flex flex-col items-center text-center w-40 shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-950 flex flex-col items-center justify-center border-2 border-emerald-400 shadow-inner overflow-hidden relative mb-2">
                {/* Map of Iraq shape in golden color made with text/symbols */}
                <span className="text-[7px] text-emerald-300 font-bold uppercase leading-none">ITU</span>
                <span className="text-[8px] text-amber-400 font-bold">العراق</span>
                <span className="text-[7px] text-emerald-300 leading-none">مقر العراق</span>
                {/* Green flag indicators */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-white to-black opacity-60" />
              </div>
              <span className="text-[9px] text-emerald-400 font-bold">شريك تدريب تخصصي</span>
              <p className="text-[10px] font-bold text-slate-200 leading-tight mt-1">
                نقابة المدربين العراقيين
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
