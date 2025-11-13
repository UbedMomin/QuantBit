import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingSummary = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/requests/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingRequests(res.data);
      } catch (err) {
        console.error("Error fetching pending requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading pending requests...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Pending Request Summary
        </h2>

        {pendingRequests.length === 0 ? (
          <p className="text-center text-gray-600">No pending requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Material</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Site</th>
                  <th className="py-2 px-4 text-left">Requested By</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req, index) => (
                  <tr
                    key={req._id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{req.materialName}</td>
                    <td className="py-2 px-4">{req.quantity}</td>
                    <td className="py-2 px-4">{req.site}</td>
                    <td className="py-2 px-4">{req.requestedBy}</td>
                    <td className="py-2 px-4">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 text-yellow-600 font-semibold">
                      {req.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingSummary;