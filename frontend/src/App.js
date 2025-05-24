import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

export default function App() {
  const [toEdit, setToEdit] = useState(null);
  function handleSaved() {
    setToEdit(null);
  }

  return (
    <div className="container">
      <h1>User Management</h1>
      <UserForm editUser={toEdit} onSaved={handleSaved} />
      <hr />
      <UserList onEdit={setToEdit} />
    </div>
  );
}