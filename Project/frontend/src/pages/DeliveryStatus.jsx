import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, Truck, Package, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "../services/api";

function DeliveryStatus() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);
  const [error, setError] = useState(null);

  // Fetch deliveries
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await api.get("/requests/delivery");
      setDeliveries(res.data || []);
    } catch (err) {
      setError("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  // Mark as received
  const markReceived = async (id) => {
    try {
      setMarking(id);
      await api.patch(`/requests/${id}`, { status: "Delivered" });
      setDeliveries((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "Delivered" } : req
        )
      );
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setMarking(null);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 font-medium mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Delivery Status Tracker
      </h1>

      {deliveries.length === 0 ? (
        <div className="text-gray-500 text-center">No deliveries to track 🚚</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliveries.map((req) => (
            <Card key={req._id} className="shadow-md rounded-xl">
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-gray-800">
                    {req.materialName}
                  </h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      req.status === "Approved"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.status === "In Delivery"
                        ? "bg-blue-100 text-blue-800"
                        : req.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  Quantity: <b>{req.quantity}</b>
                </p>
                <p className="text-sm text-gray-600 mb-1">
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

                {/* Timeline Progress */}
                <div className="flex items-center justify-between my-4">
                  <ClipboardList
                    className={`w-6 h-6 ${
                      ["Approved", "In Delivery", "Delivered"].includes(req.status)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 border-t-2 border-dashed mx-2 border-gray-300"></div>
                  <Truck
                    className={`w-6 h-6 ${
                      ["In Delivery", "Delivered"].includes(req.status)
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1 border-t-2 border-dashed mx-2 border-gray-300"></div>
                  <Package
                    className={`w-6 h-6 ${
                      req.status === "Delivered"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                {req.status !== "Delivered" && (
                  <Button
                    onClick={() => markReceived(req._id)}
                    disabled={marking === req._id}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {marking === req._id ? (
                      <Loader2 className="animate-spin w-4 h-4 mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Mark as Received
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliveryStatus;