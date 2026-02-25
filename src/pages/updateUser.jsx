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
  
  const [error, setError] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorLastName, setErrorLastName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAge, setErrorAge] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
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

const isDataChanged = () => {
  return (
    JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      role: formData.role,
    }) !==
    JSON.stringify({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      age: user.age || "",
      gender: user.gender || "",  
      phone: user.phone || "",
      role: user.role || "",
    })
  );
};
const closeModal = () => {
  if (isDataChanged()) {
    if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
      close();
    }
  } else {
    close();
  }
}



  const handleBlur = (e) => {
    if (e.target.name === "firstName" &&  !/^[A-Za-z]+$/.test(e.target.value) && e.target.value.length <= 2) {
      setErrorName("First name must be at least 2 characters long.");
      setMessage(null);
    } else if (e.target.name === "lastName" && !/^[A-Za-z]+$/.test(e.target.value) && e.target.value.length <= 5) {
      setErrorLastName("Last name must be at least 2 characters long.");
      setMessage("");
    } else if (e.target.name === "email" && !/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setErrorEmail("Invalid email format.");
      setMessage("");
    } else if (e.target.name === "age" && (e.target.value < 18 || e.target.value > 100)) {
      setErrorAge("Age must be between 18 and 100.");
      setMessage("");
    } else if (e.target.name === "phone" && !/^\d{10}$/.test(e.target.value)) {
      setErrorPhone("Phone number must be 10 digits.");
      setMessage("");
    } else {
      if (e.target.name === "firstName" || e.target.name === "lastName" || e.target.name === "email" || e.target.name === "age" || e.target.name === "phone") {
        setError(null);
        setMessage("");
     } 
    }
  };

return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New User
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errorName && (
            <p className="text-red-500 text-sm mt-1">{errorName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errorLastName && (
            <p className="text-red-500 text-sm mt-1">{errorLastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errorEmail && (
            <p className="text-red-500 text-sm mt-1">{errorEmail}</p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Age
          </label>
          <input
            type="number"
            min="18"
            max="100"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errorAge && (
            <p className="text-red-500 text-sm mt-1">{errorAge}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          {errorPhone && (
            <p className="text-red-500 text-sm mt-1">{errorPhone}</p>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Add User
          </button>
        </div>

      </form>
    </div>
  </div>
);
}
export default UpdateUser;
