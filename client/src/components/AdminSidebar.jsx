import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarClock,
  History,
  BarChart3,
  LogOut,
  Leaf,
  ShieldAlert,
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
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Pickup Requests', path: '/admin/requests', icon: ClipboardList },
    { label: 'Scheduled Pickups', path: '/admin/scheduled', icon: CalendarClock },
    { label: 'Pickup History', path: '/admin/history', icon: History },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 shrink-0 border-r border-slate-800 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {/* Admin Header */}
        <div className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Admin Console</h3>
            <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Operations
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <div className="text-[10px] uppercase font-semibold text-slate-500 px-3 pb-2 tracking-wider">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-900/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <div className="px-3 py-2 bg-slate-800/30 rounded-lg border border-slate-800 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">LoggedIn User:</span> admin@ecotrack.com
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 border border-transparent hover:border-rose-900/50 transition-all"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
}
