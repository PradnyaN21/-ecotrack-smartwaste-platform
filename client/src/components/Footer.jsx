import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">EcoTrack</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart waste collection and recycling management platform ensuring cleaner communities and sustainable waste lifecycle.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[11px] font-semibold text-emerald-400">
              <Sparkles className="w-3 h-3" /> FIT-FEST 2026 Hackathon Entry
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home Landing</Link>
              </li>
              <li>
                <Link to="/request" className="hover:text-emerald-400 transition-colors">Schedule Pickup</Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-emerald-400 transition-colors">Track Request</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-emerald-400 transition-colors">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Supported Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Coverage Hubs</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Ashta & Uran Islampur</li>
              <li>Sangli & Miraj</li>
              <li>Kolhapur & Shiroli</li>
              <li>Pune & Hinjewadi</li>
              <li>Expanding across Western MH</li>
            </ul>
          </div>

          {/* Environmental Mission */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Recycling Standard</h4>
            <p className="text-xs leading-relaxed text-slate-400 mb-3">
              100% verified material separation & municipal waste stream integration. Zero landfill waste policy.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Shield className="w-4 h-4" /> Eco-Certified Process
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 EcoTrack Platform. Built for FIT-FEST 2026 HACKATHON.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Designed for sustainable communities</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
