import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, KeyRound, AlertCircle, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@ecotrack.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Leaf className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Portal Login</h1>
          <p className="text-xs text-slate-500">
            EcoTrack Smart Waste Collection Management Dashboard
          </p>
        </div>

        {/* Demo credentials notification pill */}
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            FIT-FEST Demo Credentials
          </div>
          <p className="text-xs text-emerald-800">
            Email: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200">admin@ecotrack.com</code>
          </p>
          <p className="text-xs text-emerald-800">
            Password: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200">admin123</code>
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Login to Admin Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
