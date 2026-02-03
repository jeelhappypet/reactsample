import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect , useState} from 'react'
import { RingLoader } from 'react-spinners'

const SingleUser = () => {

    const {id} = useParams();
    const [user, setUser] = useState(null);

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
            <div>
                <div>
                    <img src={user.image} alt={user.firstName} className="w-32 h-32 rounded-full object-cover mx-auto" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mt-4">{user.firstName} {user.lastName}</h2>
                    <h2 className="text-lg font-medium mt-2">{user.email}</h2>
                    <h2 className=''>{user.phone}</h2>
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
