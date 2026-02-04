import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
//   const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RingLoader
          color="#000000"
          cssOverride={{}}
          loading
          size={100}
          speedMultiplier={2}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

//   const deleteUser = (userId) => {
//     const data = users.filter(user => user.id !== userId);
//     setUsers(data);  
//     console.log("Deleted user with ID:", userId);
//   };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-5">
      <div>
        <h1 className="text-2xl font-bold mb-4 ">All Users Data</h1>
      </div>
      <div>
        <div className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-4 font-semibold bg-gray-100 border-b border-gray-200 place-items-center">
            <div>ID</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Age</div>
            <div>Email</div>
          </div>
          {data.users.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 place-items-center cursor-pointer"
            >
              <div>{user.id}</div>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.age}</div>
              <div>{user.email}</div>

            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AllUser;
