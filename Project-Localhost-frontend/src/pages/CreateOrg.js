import React, { useState } from "react";

export default function CreateOrg() {
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [joinCode, setJoinCode] = useState(generateJoinCode());
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Now defined

  // Generate a unique join code
  function generateJoinCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!orgName.trim()) {
      alert("Organization name is required.");
      return;
    }

    const orgData = {
      name: orgName,
      description,
      joinCode, // ✅ Fixed typo
    };

    try {
      const response = await fetch("http://localhost:5000/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orgData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Organization registered successfully!");
        setOrgName("");
        setDescription("");
        setJoinCode(generateJoinCode());
      } else {
        alert("Seems like we aren't able to register your organization. Try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
    <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Register an Organization
      </h2>

      {successMessage && (
        <p className="text-green-600 text-center mb-4 font-medium">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter organization name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 h-40 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Brief description of the organization"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium m   b-1">
            Join Code
          </label>
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
            <span className="text-gray-700 font-mono text-lg">{joinCode}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Share this code with members to let them join your organization.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold text-lg transition duration-200 shadow-md"
        >
          Register Organization
        </button>
      </form>
    </div>
  </div>
  );
}