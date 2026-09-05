import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    // Pass along to OTP verification screen
    sessionStorage.setItem('pending_phone', `+91 ${cleaned}`);
    showToast('OTP sent successfully to your mobile!');
    navigate('/otp');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] text-white flex items-center justify-center mx-auto shadow-md">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            Welcome to New Family Bazar
          </h1>
          <p className="text-xs text-slate-500">
            Login or create your account to unlock personalized offers & track orders
          </p>
        </div>

        {/* Phone Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mobile Number
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <span className="text-xs font-bold text-slate-700 pr-2 border-r border-slate-300 mr-2 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="Enter 10-digit number"
                className="bg-transparent w-full text-sm font-semibold outline-none text-slate-900 placeholder:text-slate-400"
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-rose-600 font-medium mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm py-3.5 rounded-xl shadow-md transition-all "
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Banner */}
        <div className="mt-6 p-3 bg-orange-50 rounded-xl border border-orange-200 text-center">
          <p className="text-[11px] text-[#c2410c] font-semibold">
            Demo quick login: Any 10-digit number (e.g. <strong>9876543210</strong>)
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ea580c]" />
          <span>Your information is protected by 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};
