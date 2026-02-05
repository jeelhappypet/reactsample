import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import SingleUser from "./singleUser";
import AddUserForm from "./addUser";

function AllUser() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 30;
  const [sortOrder, setSortOrder] = useState('asc');
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSortedData, setFilteredSortedData] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (localUsers.length === 0) {
      axios
        .get(`https://dummyjson.com/users?limit=300`)
        .then((response) => {
          const apiUsers = response.data.users;
          localStorage.setItem('users', JSON.stringify(apiUsers));
          setFullData(apiUsers);
          setFilteredSortedData(apiUsers);
          setData({ users: apiUsers.slice(0, limit), total: apiUsers.length });
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setFullData(localUsers);
      setFilteredSortedData(localUsers);
      setData({ users: localUsers.slice(0, limit), total: localUsers.length });
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    setData({ users: filteredSortedData.slice(page * limit, (page + 1) * limit), total: filteredSortedData.length });
  }, [page, filteredSortedData, limit]);

  useEffect(() => {
    if (fullData.length > 0) {
      let data = [...fullData];
      if (searchTerm) {
        data = data.filter(user =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      data.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.firstName.localeCompare(b.firstName);
        } else {
          return b.firstName.localeCompare(a.firstName);
        }
      });
      setFilteredSortedData(data);
    }
  }, [fullData, searchTerm, sortOrder]);

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

  // function shortFilter(str) {
  //   if (str.length > 15) {
  //     return str.substring(0, 15) + "...";
  //   }
  //   return str;
  // }



  //   const deleteUser = (userId) => {
  //     const data = users.filter(user => user.id !== userId);
  //     setUsers(data);  
  //     console.log("Deleted user with ID:", userId);
  //   };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-5">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="w-full flex justify-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none"
        />
      </div>



      <div>
        <div className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-8 gap-1 p-4 font-semibold bg-gray-100 border-b border-gray-200 place-items-center">
<div onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="cursor-pointer flex items-center justify-center">
                ID
                <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                </div>
<div onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="cursor-pointer flex items-center justify-center">              Profile Photo
              <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              </div>
            <div onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="cursor-pointer flex items-center justify-center">
              First Name
              <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            </div>
<div onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="cursor-pointer flex items-center justify-center">              Last Name
              <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            </div>
<div onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="cursor-pointer flex items-center justify-center">              Age
  <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
</div>
            <div>Email</div>
            <div>Role</div>
            <div>Actions</div>
          </div>
          {data.users.map((user) => (
            <div
              key={user.id}
              onClick={() => { setSelectedUser(user); setOpenProfile(true); }}
              className="grid grid-cols-8 gap-1 p-4 border-b border-gray-200 hover:bg-gray-50 place-items-center cursor-pointer"
            >
              <div>{user.id}</div>
              <div><img src={user.image} alt="Profile" className="w-10 h-10 rounded-full" /></div>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.age}</div>
              <div className="truncate">{user.email}</div>
              <div>{user.role}</div>
              <div className=" p-2 rounded flex space-x-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) { axios.delete(`https://dummyjson.com/users/${user.id}`).then(() => {}).catch(() => {}); const updatedUsers = fullData.filter(u => u.id !== user.id); setFullData(updatedUsers); localStorage.setItem('users', JSON.stringify(updatedUsers)); } }}>Delete</button>

                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate(`/update/${user.id}`)}>Edit</button>
              </div>


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
          onClick={() => {setAddUser(true); setSelectedUser(null);}}
        >
          Add User
        </button>
      </div>
      <div className="absolute top-3 left-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4" onClick={() => navigate('/users/search')}>Search</button>
      </div>

      {openProfile && <SingleUser close={() => { setOpenProfile(false); setSelectedUser(null); }} user={selectedUser} /> }

        <div className="flex flex-col w-full">
          
          {addUser && <AddUserForm close={() => { setAddUser(false); setSelectedUser(null); }} /> }
        </div>

    </div>
    

  );
}
export default AllUser;
