import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  Compass
} from "lucide-react";

interface SumerTourProps {
  onReject: () => void;
  onAccept: () => void;
}

export function SumerTour({ onReject, onAccept }: SumerTourProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white max-w-lg w-full rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col text-right relative"
          id="tour-prompt-modal"
        >
          {/* Header pattern decoration */}
          <div className="h-3 bg-gradient-to-r from-sumer-blue via-sumer-gold to-sumer-blue w-full" />
          
          <button 
            onClick={onReject}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full cursor-pointer"
          >
            <X size={15} />
          </button>

          <div className="p-8 md:p-10 space-y-6">
            <div className="w-16 h-16 bg-sumer-blue/5 border border-sumer-blue/10 text-sumer-blue rounded-3xl flex items-center justify-center mx-auto shadow-sm">
              <Compass className="animate-spin-slow text-sumer-gold" size={30} />
            </div>

            <div className="space-y-2 text-center">
              <span className="text-[10px] font-extrabold uppercase text-sumer-gold tracking-widest bg-sumer-gold/10 px-3 py-1 rounded-full">
                الدليل التفاعلي السريع
              </span>
              <h3 className="text-xl md:text-2xl font-display font-black text-sumer-blue">
                مرحباً بك في أكاديمية سومر!
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed">
                هل ترغب في الحصول على جولة إرشادية تفاعلية داخل الصفحة؟ سيتم الإشارة وتوضيح ميزات المنصة وطريقة الاستعمال برسائل توضيحية خفيفة.
              </p>
            </div>

            {/* Informative Highlights */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs text-slate-600 font-bold leading-relaxed">
              <div className="flex items-center gap-2 justify-end">
                <span>الإشارة المباشرة لشريط الأقسام الثلاثي للتعليم</span>
                <div className="w-1.5 h-1.5 rounded-full bg-sumer-gold" />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>توضيح ميزات ومحتويات أدوات الـ AI المتقدمة الـ 14</span>
                <div className="w-1.5 h-1.5 rounded-full bg-sumer-gold" />
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>طريقة تفعيل هوية الطالب والشهادات واستخراج التقارير</span>
                <div className="w-1.5 h-1.5 rounded-full bg-sumer-gold" />
              </div>
            </div>

            {/* Accept & Decline Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onAccept}
                className="flex-1 py-3.5 px-6 bg-sumer-blue hover:opacity-95 text-white rounded-2xl text-xs font-black transition-all hover:scale-[1.01] active:scale-99 shadow-lg shadow-sumer-blue/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} className="text-sumer-gold animate-pulse" />
                <span>نعم، ابدأ الإرشاد الآن</span>
              </button>
              <button
                onClick={onReject}
                className="flex-1 py-3.5 px-6 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>لا، شكراً لك</span>
                <X size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
