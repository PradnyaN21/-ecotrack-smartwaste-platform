import React, { useState, useEffect } from 'react';
import { CalendarClock, Truck, CheckCircle2, MapPin, User, Phone, RefreshCw } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminScheduled() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScheduled = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (res.ok && data.success) {
        const filtered = data.data.filter((r) => r.status === 'Scheduled' || r.status === 'Assigned');
        setRequests(filtered);
      }
    } catch (err) {
      console.error('Fetch scheduled error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduled();
  }, []);

  const updateStatus = async (requestId, newStatus) => {
    try {
      const res = await fetch(`/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        fetchScheduled();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Scheduled Pickups Dispatch</h1>
            <p className="text-xs text-slate-500">Active pickup routes ready for collection</p>
          </div>

          <button
            onClick={fetchScheduled}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh Route
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 space-y-2">
            <CalendarClock className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No Active Scheduled Pickups</h3>
            <p className="text-xs">All scheduled pickups have been picked up or completed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Request ID</span>
                    <h4 className="font-mono font-black text-slate-900 text-lg">{req.requestId}</h4>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      req.status === 'Assigned' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-semibold text-slate-800">{req.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-mono font-semibold text-slate-800">{req.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waste Category:</span>
                    <span className="font-bold text-emerald-700">{req.wasteCategory} ({req.quantity})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Window:</span>
                    <span className="font-semibold text-slate-800">{req.pickupDate} ({req.pickupTime})</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-400 block mb-0.5">Location:</span>
                    <p className="font-medium text-slate-800">{req.address}, {req.city}</p>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => updateStatus(req.requestId, 'Picked Up')}
                    className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    Mark Picked Up
                  </button>

                  <button
                    onClick={() => updateStatus(req.requestId, 'Completed')}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
