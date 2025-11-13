// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch requests ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Dashboard</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading requests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No material requests found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Material</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Requested On</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, i) => (
                <tr
                  key={req._id}
                  className={`text-center ${
                    req.status === "Pending"
                      ? "bg-yellow-50"
                      : req.status === "Approved"
                      ? "bg-green-50"
                      : req.status === "Rejected"
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border font-medium">
                    {req.materialType}
                  </td>
                  <td className="py-2 px-4 border">
                    {req.quantity} {req.unit}
                  </td>
                  <td className="py-2 px-4 border">{req.siteLocation}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${
                      req.status === "Pending"
                        ? "text-yellow-600"
                        : req.status === "Approved"
                        ? "text-green-600"
                        : req.status === "Rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;