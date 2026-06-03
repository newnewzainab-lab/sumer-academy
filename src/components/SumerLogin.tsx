"use client";

import { useState } from "react";

export default function SumerLogin() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const endpoint = activeTab === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload = activeTab === "login" 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ ما");

      setMessage({ 
        type: "success", 
        text: activeTab === "login" ? "تم تسجيل الدخول بنجاح! جاري الانتقال..." : "تم إنشاء الحساب بنجاح! يمكنك الدخول الآن." 
      });
      
      if (activeTab === "login") {
        setTimeout(() => window.location.href = "/dashboard", 2000);
      } else {
        setActiveTab("login");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1a3e] flex items-center justify-center p-4 dir-rtl text-right">
      <div className="w-full max-w-md bg-[#13234e] rounded-2xl shadow-2xl border border-orange-500/20 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            أكاديمية <span className="text-orange-550 text-orange-500">سومر</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">منصة التعليم المستمر المجانية للطلاب</p>
        </div>

        {/* أزرار التبديل الديناميكية باللون البرتقالي */}
        <div className="flex bg-[#0d1a3e] p-1 rounded-xl mb-6 border border-gray-800">
          <button
            type="button"
            onClick={() => { setActiveTab("login"); setMessage(null); }}
            className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-all ${
              activeTab === "login" ? "bg-orange-500 text-[#0d1a3e] font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("register"); setMessage(null); }}
            className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg transition-all ${
              activeTab === "register" ? "bg-orange-500 text-[#0d1a3e] font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            إنشاء حساب طالب جديد
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm mb-4 text-center font-medium ${
            message.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && (
            <>
              <div>
                <label className="block text-xs text-gray-300 mb-1">الاسم الكامل للطالب</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-[#0d1a3e] border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500 text-sm text-right"
                  placeholder="أدخل اسمك الثلاثي"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 mb-1">رقم الهاتف</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#0d1a3e] border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500 text-sm text-left"
                  placeholder="07XXXXXXXX"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-gray-300 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#0d1a3e] border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500 text-sm text-left"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">كلمة المرور</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-[#0d1a3e] border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500 text-sm text-left"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-[#0d1a3e] font-bold py-3 rounded-xl transition-colors mt-6 text-sm flex items-center justify-center shadow-md shadow-orange-500/10"
          >
            {loading ? "جاري التحميل..." : activeTab === "login" ? "تسجيل الدخول" : "تأكيد الحساب والاشتراك مجاناً"}
          </button>
        </form>

      </div>
    </div>
  );
}
