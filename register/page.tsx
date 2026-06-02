'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function RegisterPage() {
  const supabase = createClientComponentClient();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone_number: phone,
          role: 'student'
        }
      }
    });

    setLoading(false);

    if (error) {
      setMessage(`حدث خطأ: ${error.message}`);
    } else {
      setMessage('تم إرسال رمز التفعيل المكون من 6 أرقام إلى بريدك الإلكتروني بنجاح!');
      setStep(2); 
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: 'signup'
    });

    setLoading(false);

    if (error) {
      setMessage(`الرمز غير صحيح: ${error.message}`);
    } else {
      setMessage('تم تفعيل حسابك بنجاح! جاري توجيهك للأكاديمية...');
      window.location.href = '/dashboard'; 
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '12px', direction: 'rtl', fontFamily: 'sans-serif', boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center', color: '#111' }}>منصة سومر الرقمية - حساب جديد</h2>
      
      {message && <p style={{ padding: '10px', backgroundColor: '#f0f4f8', borderRadius: '6px', fontSize: '14px', color: '#333' }}>{message}</p>}

      {step === 1 ? (
        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>البريد الإلكتروني للدانم:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa' }} placeholder="example@gmail.com" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>رقم الهاتف (الواتساب):</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa' }} placeholder="07xxxxxxxx" />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>كلمة المرور:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa' }} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'جاري المعالجة وإرسال الرمز...' : 'إنشاء الحساب واستلام الرمز'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>أدخل رمز التحقق (OTP) المكون من 6 أرقام:</label>
            <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required maxLength={6} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa', letterSpacing: '8px', textAlign: 'center', fontSize: '20px' }} placeholder="000000" />
          </div>

          <button type="submit" disabled={loading} style={{ padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'جاري التحقق من الرمز...' : 'تأكيد الرمز وتفعيل الحساب'}
          </button>
        </form>
      )}
    </div>
  );
}
