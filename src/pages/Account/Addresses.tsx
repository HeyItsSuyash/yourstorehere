import React, { useState } from 'react';
import { AccountLayout } from '../../components/Account/AccountLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, Edit2, MapPin, Check, Home, Briefcase } from 'lucide-react';
import { Address } from '../../types';

export const Addresses: React.FC = () => {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } =
    useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    type: 'Home',
    flat: '',
    street: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    isDefault: false
  });

  const handleStartAdd = () => {
    setEditingId(null);
    setFormData({
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      type: 'Home',
      flat: '',
      street: '',
      landmark: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      isDefault: addresses.length === 0
    });
    setIsEditing(true);
  };

  const handleStartEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      name: addr.name,
      phone: addr.phone,
      type: addr.type,
      flat: addr.flat,
      street: addr.street,
      landmark: addr.landmark || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: !!addr.isDefault
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.flat || !formData.street) {
      showToast('Please fill flat & street details', 'warning');
      return;
    }

    if (editingId) {
      updateAddress(editingId, formData);
      showToast('Address updated successfully!');
    } else {
      addAddress(formData);
      showToast('New address saved!');
    }
    setIsEditing(false);
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Saved Addresses
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your home, office, and family delivery locations.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-4 py-2.5 rounded-xl-none shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Address</span>
          </button>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-xl-none border transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? 'bg-orange-50/40 border-orange-300 ring-1 ring-orange-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-xl-none bg-orange-100 text-[#c2410c] flex items-center gap-1">
                    {addr.type === 'Home' ? (
                      <Home className="w-3 h-3" />
                    ) : (
                      <Briefcase className="w-3 h-3" />
                    )}
                    {addr.type}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-black text-[#ea580c] uppercase bg-white border border-orange-200 px-2 py-0.5 rounded-xl-none">
                      Default
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-900">{addr.name}</h3>
                <p className="text-xs text-slate-600 mt-1">
                  {addr.flat}, {addr.street}
                </p>
                {addr.landmark && (
                  <p className="text-[11px] text-slate-400">Landmark: {addr.landmark}</p>
                )}
                <p className="text-[11px] text-slate-500 font-semibold mt-1">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Mobile: {addr.phone}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => {
                      setDefaultAddress(addr.id);
                      showToast('Set as default delivery address');
                    }}
                    className="text-[#ea580c] font-bold hover:underline"
                  >
                    Set as Default
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(addr)}
                    className="text-slate-600 hover:text-[#ea580c] flex items-center gap-1 font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteAddress(addr.id);
                      showToast('Address deleted', 'info');
                    }}
                    className="text-slate-400 hover:text-rose-600 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Inline Editor */}
        {isEditing && (
          <form
            onSubmit={handleSave}
            className="p-6 bg-slate-50 rounded-xl-none border border-slate-200 space-y-4 animate-in fade-in"
          >
            <h3 className="text-sm font-bold text-slate-900 uppercase">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Receiver's Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
                required
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
                required
              />
              <input
                type="text"
                placeholder="Flat / House / Floor"
                value={formData.flat}
                onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
                required
              />
              <input
                type="text"
                placeholder="Street / Area Name"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
                required
              />
              <input
                type="text"
                placeholder="Landmark"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
              />
              <input
                type="text"
                placeholder="6-Digit Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="p-2.5 text-xs bg-white border border-slate-200 rounded-xl-none"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Address Type:</span>
              {(['Home', 'Work', 'Other'] as const).map((t) => (
                <label key={t} className="flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    checked={formData.type === t}
                    onChange={() => setFormData({ ...formData, type: t })}
                    className="accent-[#ea580c]"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#ea580c] text-white rounded-xl-none shadow-xs"
              >
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>
    </AccountLayout>
  );
};
