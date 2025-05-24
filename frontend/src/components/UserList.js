import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/api';

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);

  async function load() {
    const data = await fetchUsers();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <div className="card-container">
        {users.map(user => (
          <div className="card" key={user.user_id}>
            <div className="card-content">
              <p><strong>ID:</strong> {user.user_id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>City:</strong> {user.city}</p>
            </div>
            <div className="card-buttons">
              <button className="edit" onClick={() => onEdit(user)}>Edit</button>
              <button
                className="delete"
                onClick={async () => { await deleteUser(user.user_id); load(); }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="refresh" onClick={load}>Refresh</button>
      </div>
    </div>
  );
}