import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import '../index.css'
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
    <div className="p-4 overlay">
      {user ? (
        <div className="max-w-md min-w-full mx-auto flex flex-col items-center justify-center modal">
            <div className='w-full bg-red-200 flex items-center justify-center'><h1 className="text-2xl font-bold mb-4 " >User Details</h1></div>
            <div className="w-full bg-white border border-gray-200 shadow-md rounded-lg p-6 mt-4">
                <div>
                    <img src={user.image || formData.image} alt={user.firstName} className="w-32 h-32 rounded-full object-cover mx-auto" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-semibold">Full Name:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-medium">{user.firstName}  {user.lastName}</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-semibold">Email:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-medium">{user.email}</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-semibold">Gender:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-medium">{user.gender}</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-semibold">Age:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-medium">{user.age}</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-semibold">Contact No:</h2>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <h2 className="text-lg font-medium">{user.phone}</h2>
                    </div>

                    <div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={close}>Back</button>
                    </div>
                </div>

            </div>

        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <RingLoader
            color="#000000"
            cssOverride={{}}
            loading
            size={100}
            speedMultiplier={2}
          />
        </div>
      )}
    </div>
  )
}

export default SingleUser
