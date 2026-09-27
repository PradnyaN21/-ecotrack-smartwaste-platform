import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarCheck,
  UserCheck,
  Truck,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Package,
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let url = '/api/requests?';
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (statusFilter !== 'All') url += `status=${encodeURIComponent(statusFilter)}&`;
      if (categoryFilter !== 'All') url += `category=${encodeURIComponent(categoryFilter)}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error('Fetch requests error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search, statusFilter, categoryFilter]);

  const handleStatusChange = async (reqId, newStatus) => {
    setUpdatingId(reqId);
    setMessage('');
    try {
      const res = await fetch(`/api/requests/${reqId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`Status updated for ${reqId} -> ${newStatus}`);
        // Update local state
        setRequests((prev) =>
          prev.map((r) => (r.requestId === reqId || r._id === reqId ? { ...r, status: newStatus } : r))
        );
        if (selectedRequest && (selectedRequest.requestId === reqId || selectedRequest._id === reqId)) {
          setSelectedRequest({ ...selectedRequest, status: newStatus });
        }
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Error updating status in MongoDB.');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = ['Pending', 'Scheduled', 'Assigned', 'Picked Up', 'Completed', 'Cancelled'];
  const categoryOptions = ['Plastic', 'Paper', 'Organic', 'E-Waste', 'Glass', 'Metal', 'General Waste'];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Pickup Requests</h1>
            <p className="text-xs text-slate-500">
              Search, filter, and update request status in real-time in MongoDB.
            </p>
          </div>

          <button
            onClick={fetchRequests}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh Table
          </button>
        </div>

        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, name, phone, city..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Statuses</option>
                {statusOptions.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All">All Categories</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Request ID</th>
                  <th className="p-3.5">Customer & Contact</th>
                  <th className="p-3.5">Category & Qty</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Pickup Window</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500">
                      No pickup requests found matching current filter criteria.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-emerald-700">
                        {req.requestId}
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-slate-900 block">{req.name}</span>
                        <span className="text-[11px] font-mono text-slate-500">{req.phone}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-medium text-slate-800">{req.wasteCategory}</span>
                        <span className="block text-[10px] text-slate-400">{req.quantity}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-medium text-slate-800 block">{req.city}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[140px] block">
                          {req.locality || req.address}
                        </span>
                      </td>

                      <td className="p-3.5 text-slate-600">
                        <span className="font-medium block">{req.pickupDate}</span>
                        <span className="text-[10px] text-slate-400">{req.pickupTime}</span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={req.status}
                          disabled={updatingId === req.requestId}
                          onChange={(e) => handleStatusChange(req.requestId, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                            req.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : req.status === 'Cancelled'
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : req.status === 'Picked Up'
                              ? 'bg-teal-50 text-teal-800 border-teal-300'
                              : req.status === 'Assigned'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : req.status === 'Scheduled'
                              ? 'bg-purple-50 text-purple-800 border-purple-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg text-xs font-semibold border border-slate-200 inline-flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Details Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    Request Details
                  </span>
                  <h3 className="text-xl font-black font-mono text-slate-900">{selectedRequest.requestId}</h3>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer Name:</span>
                    <span className="font-bold text-slate-900">{selectedRequest.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-mono font-semibold text-slate-800">{selectedRequest.phone}</span>
                  </div>
                  {selectedRequest.email && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-800">{selectedRequest.email}</span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Waste Category:</span>
                    <span className="font-bold text-emerald-700">{selectedRequest.wasteCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Quantity:</span>
                    <span className="font-semibold text-slate-800">{selectedRequest.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scheduled Date:</span>
                    <span className="font-semibold text-slate-800">{selectedRequest.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time Window:</span>
                    <span className="font-semibold text-slate-800">{selectedRequest.pickupTime}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                  <span className="text-slate-500 block">Full Address:</span>
                  <p className="font-medium text-slate-800">
                    {selectedRequest.address}, {selectedRequest.locality ? selectedRequest.locality + ', ' : ''}
                    {selectedRequest.city}
                  </p>
                  {selectedRequest.notes && (
                    <p className="text-slate-600 italic pt-1 border-t border-slate-200 mt-1">
                      Notes: "{selectedRequest.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500">Update Status:</span>
                <div className="flex gap-2">
                  {statusOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedRequest.requestId, st)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        selectedRequest.status === st
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
