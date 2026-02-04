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
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users?limit=${limit}&skip=${page * limit}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page]);
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

  function shortFilter(str) {
    if (str.length > 15) {
      return str.substring(0, 15) + "...";
    }
    return str;
  }

  



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
            <div>Role</div>
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
              <div>{user.role}</div>

            
            </div>
          ))}
          <div>
            
          </div>
          
        </div>
        <div className="flex justify-center space-x-4 mt-4">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
        Previous
      </button>
      <p>Page: {page + 1}</p>
      <button onClick={() => setPage(p => Math.max(0, p + 1))} disabled={(page + 1) * limit >= data.total}>
        Next
      </button>
      </div>
      </div>
      <div className="absolute top-3 right-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={() => navigate('/users/search')}
        >
          Search Users
        </button>
      </div>
      <div className="absolute top-3 left-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={() => navigate('/users/add')}
        >
          Add User
        </button>
      </div>
      
    </div>
    
  );
}
export default AllUser;
