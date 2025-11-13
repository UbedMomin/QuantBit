// src/pages/Approvals.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "../services/api"; // axios instance

function Approvals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);

  // Fetch pending material requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/requests/pending");
      setRequests(res.data || []);
    } catch (err) {
      setError("Failed to fetch pending requests");
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve/Reject
  const handleAction = async (id, status) => {
    try {
      setActionLoading(id);
      await api.patch(`/requests/${id}`, { status });
      setRequests((prev) =>
        prev.filter((req) => req._id !== id) // remove after action
      );
    } catch (err) {
      alert("Action failed!");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-10">{error}</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Pending Material Approvals
      </h1>

      {requests.length === 0 ? (
        <div className="text-gray-500 text-center">No pending requests 🎉</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <Card key={req._id} className="shadow-md rounded-xl">
              <CardContent className="p-5">
                <h2 className="font-bold text-lg mb-1 text-gray-800">
                  {req.materialName}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Quantity: <b>{req.quantity}</b>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Site: {req.siteLocation}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Requested by: {req.engineerName}
                </p>

                {req.photo && (
                  <img
                    src={req.photo}
                    alt="site"
                    className="rounded-md mb-3 w-full h-40 object-cover"
                  />
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-100"
                    disabled={actionLoading === req._id}
                    onClick={() => handleAction(req._id, "Approved")}
                  >
                    {actionLoading === req._id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    Approve
                  </Button>

                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-100"
                    disabled={actionLoading === req._id}
                    onClick={() => handleAction(req._id, "Rejected")}
                  >
                    {actionLoading === req._id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Approvals;
