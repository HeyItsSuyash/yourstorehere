import React, { useState } from 'react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Save, Check } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'rahul.sharma@example.com',
    dob: user?.dob || '1992-08-15',
    gender: (user?.gender || 'Male') as 'Male' | 'Female' | 'Other' | 'Prefer not to say'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            My Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your personal details to receive customized family promotions and invoices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as any
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl-none text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-xl-none shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CHANGES</span>
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};
