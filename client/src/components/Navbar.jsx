import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Truck, Search, LayoutDashboard, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-800 bg-clip-text text-transparent">
                  EcoTrack
                </span>
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-emerald-600 -mt-1">
                  FIT-FEST 2026
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/request"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/request')
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4" />
              Request Pickup
            </Link>

            <Link
              to="/track"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/track')
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              Track Request
            </Link>
          </div>

          {/* Admin Link / Action */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm flex items-center gap-2 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 flex items-center gap-1.5 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Home
          </Link>
          <Link
            to="/request"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Request Pickup
          </Link>
          <Link
            to="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Track Request
          </Link>
          <div className="pt-2 border-t border-slate-100">
            {isAdminAuthenticated ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-600 text-white text-center"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium border border-slate-200 text-slate-600 text-center"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
