import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate,  } from 'react-router-dom'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/users/search?q=${searchTerm}`);
            setResults(response.data.users);
        } catch (error) {
            console.error("Error in search results:", error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        } else {
            setResults([results]);  
        }
    }, [searchTerm]);
    return (
        <div className='w-full'>
            <div className="w-full flex justify-center mt-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users..."
                    className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none"
                />
                
                <div className="absolute right-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/')}>Back</button>
                    </div>
                
            </div>
            <div className="mt-4 max-w-full mx-auto">
                {results.length > 0 ? (
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
                        </div>
                        {results.map((user) => (
                            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 place-items-center cursor-pointer"
                            key={user.id}
                            onClick={() => navigate(`/users/${user.id}`)}
                            >
                                
                           
              <div>{user.id}</div>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.age}</div>
              <div>{user.email}</div>
                <div>{user.role}</div>

              </div>
                        ))}
                            </div>
                        ) : (
                        <div className='max-w-fit mx-auto '>
                          <p className="text-center text-gray-500 mt-4">No results found.</p>
                        </div>
                )}
                    </div>

        </div>
            )
}

            export default SearchBar
