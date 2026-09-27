import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Package,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Layers,
  Recycle,
  CheckCircle2,
  Award,
} from 'lucide-react';
import StatusTimeline from '../components/StatusTimeline';
import WasteJourney from '../components/WasteJourney';
import EcoPassport from '../components/EcoPassport';

export default function TrackRequest() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(initialId);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRequestDetails = async (idToFetch) => {
    if (!idToFetch || !idToFetch.trim()) {
      setError('Please enter a Request ID (e.g., ET-2026-1001)');
      return;
    }

    setLoading(true);
    setError('');
    setRequest(null);

    try {
      const res = await fetch(`/api/requests/${encodeURIComponent(idToFetch.trim())}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setRequest(result.data);
      } else {
        setError(result.message || `No pickup request found for ID '${idToFetch}'.`);
      }
    } catch (err) {
      console.error('Track request error:', err);
      setError('Network connection error. Is MongoDB/Express running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchRequestDetails(initialId);
    }
  }, [initialId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId) {
      setSearchParams({ id: searchId });
      fetchRequestDetails(searchId);
    }
  };

  const demoPills = ['ET-2026-1001', 'ET-2026-1003', 'ET-2026-1005', 'ET-2026-1008'];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900">Track Waste & Eco Passport</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Track your live digital waste journey, Eco Score, and collection status directly from MongoDB.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Request ID (e.g. ET-2026-1001)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-base uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            <span>Track Waste</span>
          </button>
        </form>

        {/* Quick Demo ID pills */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="text-slate-400 font-medium">Quick Demo IDs:</span>
          {demoPills.map((id) => (
            <button
              key={id}
              onClick={() => {
                setSearchId(id);
                setSearchParams({ id });
                fetchRequestDetails(id);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-mono font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-5 rounded-3xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <p className="font-bold text-rose-900">Search Error</p>
            <p className="text-rose-700 text-xs">{error}</p>
          </div>
        </div>
      )}

      {/* Tracked Request Content */}
      {request && (
        <div className="space-y-8">
          {/* DIGITAL LIFECYCLE WASTE JOURNEY PIPELINE */}
          <WasteJourney currentStatus={request.status} />

          {/* ECOFLOW WASTE PASSPORT DISPLAY */}
          <EcoPassport request={request} />

          {/* Visual Status Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Status Progress</h3>
            <StatusTimeline currentStatus={request.status} />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-emerald-600" />
                Customer & Location Info
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer Name:</span>
                  <span className="font-bold text-slate-800">{request.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono font-bold text-slate-800">{request.phone}</span>
                </div>
                {request.email && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-800">{request.email}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-500 block mb-0.5">Address & Locality:</span>
                  <p className="font-medium text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    {request.address}, {request.locality ? request.locality + ', ' : ''}
                    {request.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Package className="w-4 h-4 text-emerald-600" />
                Waste & Wave Allocation
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Waste Category:</span>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {request.wasteCategory}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Quantity Estimate:</span>
                  <span className="font-bold text-slate-800">{request.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Collection Wave ID:</span>
                  <span className="font-mono font-bold text-emerald-700">{request.collectionWaveId || 'WAVE-ASSIGNED'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-800">{request.pickupDate} ({request.pickupTime})</span>
                </div>
                {request.notes && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-slate-500 block mb-0.5">Pickup Notes:</span>
                    <p className="text-slate-700 italic bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                      "{request.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
