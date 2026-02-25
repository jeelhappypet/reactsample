import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import SingleUser from "./singleUser";
import AddUserForm from "./addUser";
import UpdateUser from "./updateUser";

function AllUser() {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const limit = 30;
  const [sortOrder, setSortOrder] = useState("asc");
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUser, setAddUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSortedData, setFilteredSortedData] = useState([]);
  const [updateUser, setUpdateUser] = useState(false);
  const refreshData = () => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    setFullData(localUsers);
    setFilteredSortedData(localUsers);
    setData({ users: localUsers.slice(0, limit), total: localUsers.length });
  };

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (localUsers.length === 0) {
      axios
        .get(`https://dummyjson.com/users?limit=300`)
        .then((response) => {
          const apiUsers = response.data.users;
          localStorage.setItem("users", JSON.stringify(apiUsers));
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
    setData({
      users: filteredSortedData.slice(page * limit, (page + 1) * limit),
      total: filteredSortedData.length,
    });
  }, [page, filteredSortedData, limit]);

  useEffect(() => {
    if (fullData.length > 0) {
      let data = [...fullData];
      if (searchTerm) {
        data = data.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }
      data.sort((a, b) => {
        if (sortOrder === "asc") {
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
  <div className="min-h-screen bg-gray-100 p-6 relative">

    {/* Header Section */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="px-4 py-2 w-64 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => {
            setAddUser(true);
            setSelectedUser(null);
          }}
        >
          + Add User
        </button>
      </div>
    </div>

    {/* Table Card */}
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Table Header */}
      <div className="grid grid-cols-8 px-6 py-4 bg-gray-50 font-semibold text-gray-700 text-sm border-b">
        <div
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="cursor-pointer flex items-center gap-1"
        >
          ID {sortOrder === "asc" ? "↑" : "↓"}
        </div>
        <div>Photo</div>
        <div>First Name</div>
        <div>Last Name</div>
        <div>Age</div>
        <div>Email</div>
        <div>Role</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Rows */}
      {data.users.map((user) => (
        <div
          key={user.id}
          onClick={() => {
            setSelectedUser(user);
            setOpenProfile(true);
          }}
          className="grid grid-cols-8 px-6 py-4 items-center text-sm border-b hover:bg-gray-50 transition cursor-pointer"
        >
          <div className="font-medium text-gray-700">{user.id}</div>

          <div>
            <img
              src={user.image}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border"
            />
          </div>

          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.age}</div>

          <div className="truncate max-w-[150px]">{user.email}</div>

          <div>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
              {user.role}
            </span>
          </div>

          {/* Actions */}
          <div
            className="flex justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition"
              onClick={() => {
                setSelectedUser(user);
                setUpdateUser(true);
              }}
            >
              Edit
            </button>

            <button
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this user?"
                  )
                ) {
                  axios
                    .delete(`https://dummyjson.com/users/${user.id}`)
                    .then(() => {})
                    .catch(() => {});

                  const updatedUsers = fullData.filter(
                    (u) => u.id !== user.id
                  );
                  setFullData(updatedUsers);
                  localStorage.setItem(
                    "users",
                    JSON.stringify(updatedUsers)
                  );
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-center items-center gap-6 mt-6">
      <button
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Previous
      </button>

      <span className="text-gray-700 font-medium">
        Page {page + 1}
      </span>

      <button
        onClick={() => setPage((p) => Math.max(0, p + 1))}
        disabled={(page + 1) * limit >= data.total}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next
      </button>
    </div>

    {/* Modals */}
    {openProfile && (
      <SingleUser
        close={() => {
          setOpenProfile(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    )}

    {addUser && (
      <AddUserForm
        close={() => {
          setAddUser(false);
          setSelectedUser(null);
        }}
        refreshData={refreshData}
      />
    )}

    {updateUser && (
      <UpdateUser
        close={() => {
          setUpdateUser(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        refreshData={refreshData}
      />
    )}
  </div>
);
}
export default AllUser;
