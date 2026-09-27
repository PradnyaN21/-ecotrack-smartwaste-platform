import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  Search,
  Sparkles,
  Layers,
  Leaf,
  Zap,
  Boxes,
  Recycle,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';
import SmartWasteGuide from '../components/SmartWasteGuide';
import EcoPassport from '../components/EcoPassport';

const categories = [
  { name: 'Plastic', icon: Layers, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { name: 'Paper', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { name: 'Organic', icon: Leaf, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { name: 'E-Waste', icon: Zap, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { name: 'Glass', icon: Boxes, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { name: 'Metal', icon: Recycle, color: 'text-slate-700 bg-slate-100 border-slate-300' },
  { name: 'General Waste', icon: PackageCheck, color: 'text-rose-600 bg-rose-50 border-rose-200' },
];

export default function RequestPickup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    wasteCategory: 'Plastic',
    quantity: '1-5 kg (Small Bag)',
    address: '',
    city: 'Sangli',
    locality: '',
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupTime: '10:00 AM - 12:00 PM',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.wasteCategory ||
      !formData.quantity ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pickupDate ||
      !formData.pickupTime
    ) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmittedData(result.data);
      } else {
        setError(result.message || 'Failed to submit pickup request');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Network error. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-900">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h3 className="font-bold text-base">Pickup Request Submitted Successfully!</h3>
            <p className="text-xs text-emerald-800">
              Your order has been registered in MongoDB and grouped into an EcoFlow Collection Wave.
            </p>
          </div>
        </div>

        {/* ECOFLOW WASTE PASSPORT DISPLAY */}
        <EcoPassport request={submittedData} />

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to={`/track?id=${submittedData.requestId}`}
            className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Track Request & Journey
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              setSubmittedData(null);
              setFormData({
                name: '',
                phone: '',
                email: '',
                wasteCategory: 'Plastic',
                quantity: '1-5 kg (Small Bag)',
                address: '',
                city: 'Sangli',
                locality: '',
                pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                pickupTime: '10:00 AM - 12:00 PM',
                notes: '',
              });
            }}
            className="px-8 py-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-xs transition-all cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Start a Waste Pickup</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Fill out the details below to generate your EcoFlow Waste Passport and schedule collection.
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-8">
        {/* Step 1: Select Waste Category */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-900">
            1. Select Waste Category <span className="text-rose-500">*</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = formData.wasteCategory === cat.name;

              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setFormData({ ...formData, wasteCategory: cat.name })}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 font-bold scale-105'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs">{cat.name}</span>
                </button>
              );
            })}
          </div>

          <SmartWasteGuide category={formData.wasteCategory} />
        </div>

        {/* Step 2: Customer Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-900">2. Customer Details</label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Patil"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9823012345"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. aarav@example.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Location & Quantity */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-900">3. Quantity & Pickup Location</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Quantity <span className="text-rose-500">*</span>
              </label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              >
                <option value="1-5 kg (Small Bag)">1-5 kg (Small Bag)</option>
                <option value="5-15 kg (Medium Bag)">5-15 kg (Medium Bag)</option>
                <option value="15-30 kg (Large Container)">15-30 kg (Large Container)</option>
                <option value="30+ kg (Bulk / Industrial)">30+ kg (Bulk / Industrial)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City <span className="text-rose-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                required
              >
                <option value="Sangli">Sangli</option>
                <option value="Ashta">Ashta</option>
                <option value="Islampur">Islampur</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pickup Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Plot 42, Green Avenue, Main Road"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Locality / Landmark</label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="e.g. Ashta East / Vishrambag"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Schedule */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-900">4. Select Date & Time Window</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pickup Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Time Window <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                >
                  <option value="08:00 AM - 10:00 AM">Morning (08:00 AM - 10:00 AM)</option>
                  <option value="10:00 AM - 12:00 PM">Late Morning (10:00 AM - 12:00 PM)</option>
                  <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                  <option value="04:00 PM - 06:00 PM">Evening (04:00 PM - 06:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Pickup Notes</label>
              <textarea
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Waste packed in 2 sealed boxes near gate."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Generating Eco Passport...</span>
            ) : (
              <>
                <Truck className="w-5 h-5" />
                <span>Submit & Generate Passport</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
