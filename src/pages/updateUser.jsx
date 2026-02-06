import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = ({ close, user, refreshData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.age || !formData.gender || !formData.phone || !formData.role) {
      setError("Please fill in all required fields.");
      setMessage("");
      return;
    }
    const updatedUser = { ...user, ...formData };
    close();

    // Update localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const index = allUsers.findIndex((u) => u.id == user.id);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    refreshData();

    // Try to update API
    try {
      const response = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("API update result:", result);
    } catch (err) {
      console.error("API update failed:", err);
    }

    setMessage("User updated successfully!");
    setError("");
    navigate("/");
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="overlay max-w-full mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="modal">
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border-none focus:outline-none w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border-none focus:outline-none w-full"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label className="text-xl">Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border-none focus:outline-none w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
        <button
          type="button"
          onClick={close}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
        >
          Cancel
        </button>
      </form>
      {message && (
        <p style={{ color: "green" }} className="text-2xl">
          {message}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="absolute right-4 top-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
