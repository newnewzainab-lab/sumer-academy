import { createClient } from '@supabase/supabase-js';

// جلب إعدادات الربط من ملف supabase الموجود في مجلد lib لديكِ
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 1. دالة إنشاء حساب طالب جديد حقيقي ومجاني
export const registerStudent = async (fullName: string, phone: string, email: string, password: string) => {
  // أولاً: إنشاء الحساب في نظام الحماية (Auth) الخاص بـ Supabase
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError.message);

  if (authData.user) {
    // ثانياً: حفظ بيانات الطالب الإضافية (الاسم والهاتف) في جدول Profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user.id, 
          full_name: fullName, 
          phone: phone, 
          role: 'student' 
        }
      ]);

    if (profileError) throw new Error(profileError.message);
  }

  return authData;
};

// 2. دالة تسجيل الدخول الرسمية للمنصة
export const loginStudent = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};
