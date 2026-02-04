import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUserForm = ({ userId, currentUserData }) => {
  const [firstName, setFirstName] = useState(currentUserData?.firstName || '');
  const [email, setEmail] = useState(currentUserData?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const {id} = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const updatedData = { firstName, email };

    const user = {
      id: id,
      firstName: firstName,
      email: email,
    };
    console.log('====================================');
    console.log(id, user.firstName, user.email);
    console.log('====================================');

    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), 
      });


      const result = await response.json();
      setMessage('User updated successfully!');
      setError('');
      console.log('Update successful:', result);
      
    } catch (err) {
      setError(err.message);
      setMessage('');
      console.error('Error updating user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update User {userId}</h2>
      <div>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Update User</button>
      
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default UpdateUserForm;