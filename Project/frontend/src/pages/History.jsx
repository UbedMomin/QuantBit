import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load material history ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Delivered":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Material Consumption History
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading history...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">
          No history records available.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Material</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Site</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Delivered On</th>
                <th className="py-2 px-4 border">Attachment</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr
                  key={item._id}
                  className="text-center bg-white hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border font-medium">
                    {item.materialType}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-2 px-4 border">{item.siteLocation}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.deliveredAt
                      ? new Date(item.deliveredAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.attachmentUrl ? (
                      <a
                        href={item.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Photo
                      </a>
                    ) : (
                      "No file"
                    )}
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

export default History;