import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const OTP: React.FC = () => {
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']); // pre-fill demo OTP
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const phone = sessionStorage.getItem('pending_phone') || '+91 98765 43210';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    login(phone);
    showToast('Welcome back! Logged in successfully.', 'success');
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-xl-none p-6 sm:p-8 border border-slate-200/80 shadow-md">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Number</span>
        </button>

        <h1 className="text-2xl font-black text-slate-900">
          Verify Mobile Number
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Enter the 6-digit code sent to <strong className="text-slate-800">{phone}</strong>
        </p>

        {/* OTP Demo Banner */}
        <div className="my-4 p-2.5 bg-emerald-50 rounded-xl-none border border-emerald-200 text-center">
          <span className="text-xs font-bold text-emerald-800">
            Demo OTP: <span className="tracking-widest underline font-black">123456</span>
          </span>
        </div>

        {/* 6-box input */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-12 h-14 text-center font-black text-lg border border-slate-300 rounded-xl-none bg-slate-50 focus:bg-white focus:border-emerald-600 outline-none transition-all shadow-2xs"
              />
            ))}
          </div>

          {error && <p className="text-xs text-rose-600 font-medium text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-3.5 rounded-xl-none shadow-md transition-all active:scale-95"
          >
            <span>VERIFY & PROCEED</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => showToast('New OTP sent to your phone!', 'info')}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Didn&apos;t receive OTP? Resend code
          </button>
        </div>
      </div>
    </div>
  );
};
