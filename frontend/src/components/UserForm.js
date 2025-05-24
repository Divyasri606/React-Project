import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/api';

export default function UserForm({ editUser, onSaved }) {
  const initial = { user_id: '', name: '', age: '', city: '' };
  const [user, setUser] = useState(initial);

  useEffect(() => {
    setUser(editUser || initial);
  }, [editUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editUser) {
      await updateUser(editUser.user_id, user);
    } else {
      await createUser(user);
    }
    setUser(initial);
    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', textAlign: 'center' }}>
      <input
        name="user_id"
        value={user.user_id}
        onChange={handleChange}
        placeholder="ID"
        required
        style={{ width: '60px', marginRight: '0.5rem' }}
        disabled={!!editUser}
      />
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ marginRight: '0.5rem' }}
      />
      <input
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Age"
        required
        style={{ width: '60px', marginRight: '0.5rem' }}
      />
      <input
        name="city"
        value={user.city}
        onChange={handleChange}
        placeholder="City"
        required
        style={{ marginRight: '0.5rem' }}
      />
      <button type="submit">
        {editUser ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}