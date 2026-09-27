import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Sparkles,
  CalendarClock,
  History,
  BarChart3,
  LogOut,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Command Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Collection Waves', path: '/admin/waves', icon: Sparkles, badge: 'EcoFlow' },
    { label: 'Pickup Requests', path: '/admin/requests', icon: ClipboardList },
    { label: 'Scheduled Pickups', path: '/admin/scheduled', icon: CalendarClock },
    { label: 'Pickup History', path: '/admin/history', icon: History },
    { label: 'Analytics & Impact', path: '/admin/analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-full md:w-64 bg-slate-950 text-slate-300 shrink-0 border-r border-slate-800 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {/* Admin Command Header */}
        <div className="flex items-center gap-3 p-3.5 bg-gradient-to-r from-emerald-950/80 to-slate-900 rounded-2xl border border-emerald-700/40 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20 shrink-0">
            <Leaf className="w-5 h-5 fill-slate-950/20" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white leading-tight">EcoFlow Command</h3>
            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Intelligence Center
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-500 px-3 pb-2 tracking-wider">
            Operations Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-slate-950 font-extrabold shadow-lg shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !active && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-900 space-y-2">
        <div className="px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800 text-[10px] text-slate-400">
          <span className="font-bold text-slate-300">Logged Operator:</span> admin@ecotrack.com
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 border border-slate-800 hover:border-rose-900/50 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Command Center</span>
        </button>
      </div>
    </aside>
  );
}
