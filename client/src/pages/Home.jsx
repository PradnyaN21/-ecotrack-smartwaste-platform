import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  Search,
  Recycle,
  ShieldCheck,
  BarChart2,
  MapPin,
  ArrowRight,
  PackageCheck,
  Sparkles,
  Layers,
  Leaf,
  FileText,
  Boxes,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import SmartWasteGuide from '../components/SmartWasteGuide';

const wasteCategoriesList = [
  { name: 'Plastic', icon: Layers, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', desc: 'Bottles, containers & packaging' },
  { name: 'Paper', icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-200', desc: 'Newspapers, boxes & office paper' },
  { name: 'Organic', icon: Leaf, color: 'text-amber-600 bg-amber-50 border-amber-200', desc: 'Food waste & garden trimmings' },
  { name: 'E-Waste', icon: Zap, color: 'text-purple-600 bg-purple-50 border-purple-200', desc: 'Old electronics, cables & devices' },
  { name: 'Glass', icon: Boxes, color: 'text-cyan-600 bg-cyan-50 border-cyan-200', desc: 'Bottles, jars & glassware' },
  { name: 'Metal', icon: Recycle, color: 'text-slate-700 bg-slate-100 border-slate-300', desc: 'Aluminium cans & steel containers' },
  { name: 'General Waste', icon: PackageCheck, color: 'text-rose-600 bg-rose-50 border-rose-200', desc: 'Non-recyclable household waste' },
];

export default function Home() {
  const [selectedGuideCategory, setSelectedGuideCategory] = useState('Plastic');

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white pt-16 pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>FIT-FEST 2026 HACKATHON — Smart Waste Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Smarter Waste Collection.{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Cleaner Communities.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              EcoTrack makes waste collection simple, organized and transparent — from pickup request to responsible recycling.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/request"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Truck className="w-5 h-5" />
                Request a Pickup
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 hover:border-slate-400 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-5 h-5 text-emerald-600" />
                Track Request
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      </section>

      {/* DEMO STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Platform Impact Overview</h3>
              <p className="text-xs text-slate-500">Live operational metrics & impact estimates</p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-md">
              [ Demo / Sample Metrics ]
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Total Pickup Requests</span>
              <div className="text-3xl font-extrabold text-emerald-700">1,240+</div>
              <p className="text-xs text-slate-500">Across 5 regional hubs</p>
            </div>

            <div className="space-y-1 p-4 bg-teal-50/50 rounded-xl border border-teal-100">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Waste Collected</span>
              <div className="text-3xl font-extrabold text-teal-700">820 kg</div>
              <p className="text-xs text-slate-500">Diverted from landfills</p>
            </div>

            <div className="space-y-1 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Recyclable Waste</span>
              <div className="text-3xl font-extrabold text-blue-700">68%</div>
              <p className="text-xs text-slate-500">High efficiency yield</p>
            </div>

            <div className="space-y-1 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Pickups Completed</span>
              <div className="text-3xl font-extrabold text-slate-800">320+</div>
              <p className="text-xs text-slate-500">Verified by drivers</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How EcoTrack Works</h2>
          <p className="text-sm text-slate-600">
            Four simple steps to transform household waste into valuable recycled materials.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Request Pickup',
              desc: 'Select your waste category, quantity, address and preferred collection time slot.',
              icon: Truck,
            },
            {
              step: '02',
              title: 'Smart Disposal',
              desc: 'Follow automated rule-based guidance to segregate waste cleanly before collection.',
              icon: Recycle,
            },
            {
              step: '03',
              title: 'Track Live Status',
              desc: 'Use your generated Request ID to track status updates from Pending to Completed.',
              icon: Search,
            },
            {
              step: '04',
              title: 'Responsible Recycling',
              desc: 'Our logistics partners pick up and process materials at authorized recycling units.',
              icon: ShieldCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WASTE CATEGORIES & SMART GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Supported Waste Categories</h2>
          <p className="text-sm text-slate-600">
            Click any category to test rule-based smart disposal guidance instantly.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {wasteCategoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedGuideCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedGuideCategory(cat.name)}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 scale-105'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
                }`}
              >
                <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Smart Waste Guide Banner */}
        <SmartWasteGuide category={selectedGuideCategory} />
      </section>

      {/* FEATURES & IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Built For FIT-FEST 2026</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Smart Collection Platform
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              EcoTrack bridges urban households with municipal & private waste recyclers. Designed with scalable Cloud Run architecture and MongoDB backend.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base">Real-Time MongoDB Tracking</h4>
              <p className="text-xs text-slate-300">
                Every request status update in MongoDB is immediately reflected on customer tracking screens.
              </p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 space-y-2">
              <BarChart2 className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base">Admin Dashboard & Analytics</h4>
              <p className="text-xs text-slate-300">
                Comprehensive Recharts visualizations for waste categories, status counts & pickup history.
              </p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 space-y-2">
              <MapPin className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base">Regional Hub Support</h4>
              <p className="text-xs text-slate-300">
                Optimized for local waste collection routes in Sangli, Ashta, Islampur, Kolhapur and Pune.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
