import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import axios from 'axios'
import { useState } from 'react'





const SingleUser = ({close, user}) => {

    const navigate = useNavigate();
    

    console.log(user);

    const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    role: "",
 });



return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

    {user ? (
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <button
            onClick={close}
            className="text-white hover:opacity-80 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8">

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user.image || formData.image}
              alt={user.firstName}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-100 shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="text-lg font-semibold capitalize">
                {user.gender}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Age</p>
              <p className="text-lg font-semibold">{user.age}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Contact No</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold capitalize">
                {user.role}
              </p>
            </div>

          </div>

          {/* Footer Button */}
          <div className="flex justify-end mt-8">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              onClick={close}
            >
              Back
            </button>
          </div>

        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-screen">
        <RingLoader
          color="#2563EB"
          loading
          size={100}
          speedMultiplier={2}
        />
      </div>
    )}
  </div>
);
}

export default SingleUser
