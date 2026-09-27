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
  Award,
} from 'lucide-react';
import SmartWasteGuide from '../components/SmartWasteGuide';
import WasteJourney from '../components/WasteJourney';

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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 text-white pt-16 pb-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>FIT-FEST 2026 HACKATHON — EcoFlow Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white">
              Waste In.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Impact Out.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              EcoTrack turns everyday waste pickups into organized, measurable circular actions — from automated Eco Scores to smart Collection Waves.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/request"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Truck className="w-5 h-5 fill-slate-950/20" />
                Start a Pickup
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/track"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 hover:border-slate-600 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Search className="w-5 h-5 text-emerald-400" />
                Track My Waste
              </Link>
            </div>
          </div>

          {/* EcoFlow Intelligence Animated Pipeline Diagram */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
                EcoFlow Rule-Based Logistics Engine
              </span>
              <h3 className="text-lg font-black text-white mt-1">Automated Circular Operations Flow</h3>
            </div>

            {/* Horizontal Animated Flow Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
              {[
                { title: 'Waste Request', sub: 'Category & Details', icon: Layers, color: 'text-emerald-400' },
                { title: 'EcoFlow Engine', sub: 'Eco Score & Passport', icon: Sparkles, color: 'text-amber-400' },
                { title: 'Collection Wave', sub: 'Locality Clustering', icon: MapPin, color: 'text-teal-300' },
                { title: 'Logistics Pickup', sub: 'Verified Collection', icon: Truck, color: 'text-blue-400' },
                { title: 'Environmental Impact', sub: 'Landfill Diversion', icon: Recycle, color: 'text-emerald-400' },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center space-y-2 relative group hover:border-emerald-500/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{step.title}</h4>
                      <p className="text-[10px] text-slate-400">{step.sub}</p>
                    </div>
                    {idx < 4 && (
                      <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      </section>

      {/* NEW SECTION: YOUR WASTE JOURNEY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WasteJourney currentStatus="Pending" />
      </section>

      {/* DEMO IMPACT OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Platform Impact Metrics</h3>
              <p className="text-xs text-slate-500">Live operational estimates & diversion metrics</p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              [ Prototype Estimates ]
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Total Pickup Requests</span>
              <div className="text-3xl font-black text-emerald-700">1,240+</div>
              <p className="text-xs text-slate-500">Across 5 regional hubs</p>
            </div>

            <div className="space-y-1 p-4 bg-teal-50/60 rounded-2xl border border-teal-100">
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">Est. Landfill Diversion</span>
              <div className="text-3xl font-black text-teal-700">697 kg</div>
              <p className="text-xs text-slate-500">85% average diversion yield</p>
            </div>

            <div className="space-y-1 p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Average Eco Score</span>
              <div className="text-3xl font-black text-blue-700">82 / 100</div>
              <p className="text-xs text-slate-500">High separation accuracy</p>
            </div>

            <div className="space-y-1 p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">Eco Points Distributed</span>
              <div className="text-3xl font-black text-purple-700">62,000+</div>
              <p className="text-xs text-slate-500">Engagement reward score</p>
            </div>
          </div>
        </div>
      </section>

      {/* WASTE CATEGORIES & SMART GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Supported Waste Categories</h2>
          <p className="text-sm text-slate-600">
            Click any category below to preview rule-based smart disposal guidance.
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
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 scale-105'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : cat.color}`}>
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

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How EcoTrack Works</h2>
          <p className="text-sm text-slate-600">
            Simple steps to convert household waste into verified circular recycling output.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Request Pickup',
              desc: 'Select waste category, enter details, location and pickup time window.',
              icon: Truck,
            },
            {
              step: '02',
              title: 'Waste Passport',
              desc: 'EcoFlow calculates your Eco Score, Eco Points & landfill diversion estimate.',
              icon: Award,
            },
            {
              step: '03',
              title: 'Collection Waves',
              desc: 'Admin console automatically groups nearby requests into optimized route waves.',
              icon: Sparkles,
            },
            {
              step: '04',
              title: 'Responsible Recycling',
              desc: 'Verified pickup and sorting at authorized municipal & private recycling facilities.',
              icon: ShieldCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-emerald-300 transition-colors">
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
    </div>
  );
}
