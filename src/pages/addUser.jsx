import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = { id: Date.now(), ...formData };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      console.log("User added successfully:", newUser);
      setMessage("User added successfully!");
      setError(null);
      setFormData({ firstName: "", lastName: "", email: "" ,age:"" , gender:"" ,phone:"", role:""});
    } catch (err) {
      console.error("Error adding user:", err.message);
      setError("Error adding user. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="name" className="text-2xl">First Name:</label>
          <input
            type="text"
            id="name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="lastName" className="text-xl">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="email" className="text-xl">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="age" className="text-xl">Age:</label>
          <input
            type="number"
            min="18"
            max="100"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="border-none focus:outline-dotted"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="gender" className="text-xl">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border-none focus:outline-none "
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="phone" className="text-xl">Phone:</label>
          <input
            type="telephone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border-none focus:outline-none"
          />
        </div>
        <div className="mb-4 w-full border-2 p-2 rounded">
          <label htmlFor="role" className="text-xl">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="border-none focus:outline-none"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add User</button>
      </form>
      {message && <p style={{ color: "green" }} className="text-2xl">{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="absolute right-4 top-3">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/')}>Back</button>
                    </div>
    </div>
  );
};

export default AddUserForm;
