import React, { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 210;

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${page * limit}`)
      .then(res => res.json())
      .then(json => {
        setData(json.users); 
        setLoading(false);
      });
  }, [page]); 

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {data.map(user => <li key={user.id}>{user.firstName}</li>)}
        </ul>
      )}
      <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
        Previous
      </button>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
      <p>Page: {page + 1}</p>
    </div>
  );
}

export default DataDisplay;