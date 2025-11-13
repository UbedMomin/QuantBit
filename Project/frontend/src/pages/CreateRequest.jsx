// src/pages/CreateRequest.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    materialType: "",
    quantity: "",
    unit: "bags",
    siteLocation: "",
    remarks: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (photo) data.append("photo", photo);

      const res = await axios.post("http://localhost:5000/api/requests", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Request created successfully ✅");
      setFormData({
        materialType: "",
        quantity: "",
        unit: "bags",
        siteLocation: "",
        remarks: "",
      });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setMessage("Error creating request ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Material Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="materialType"
          value={formData.materialType}
          onChange={handleChange}
          placeholder="Material Type (e.g., Cement, Sand)"
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-1/2 border p-2 rounded"
            required
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-1/2 border p-2 rounded"
          >
            <option value="bags">Bags</option>
            <option value="tons">Tons</option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
          </select>
        </div>

        <input
          type="text"
          name="siteLocation"
          value={formData.siteLocation}
          onChange={handleChange}
          placeholder="Site Location"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks (optional)"
          className="w-full border p-2 rounded"
          rows="3"
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Create Request"}
        </button>
      </form>

      {message && <p className="text-center mt-4 font-medium">{message}</p>}
    </div>
  );
};

export default CreateRequest;