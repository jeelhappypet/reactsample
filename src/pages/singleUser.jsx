import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect , useState} from 'react'
import { RingLoader } from 'react-spinners'

const SingleUser = () => {

    const {id} = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://dummyjson.com/users/${id}`)
        .then((response) => {
            setUser(response.data);
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
        })
        .catch((error) => {
            console.error("There was an error fetching the user data!", error);
        });
    }, [id]);

  return (
    <div className="p-4">
      {user ? (
        <div className="max-w-md min-w-full mx-auto flex flex-col items-center justify-center">
            <div className='w-full bg-red-200 flex items-center justify-center'><h1 className="text-2xl font-bold mb-4 " >User Details</h1></div>
            <div className="w-full bg-white border border-gray-200 shadow-md rounded-lg p-6 mt-4">
                <div>
                    <img src={user.image} alt={user.firstName} className="w-32 h-32 rounded-full object-cover mx-auto" />
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
                    <div className="bg-gray-100 p-2 rounded">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" >Delete</button>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >Edit</button>
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/users')}>Back</button>
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
