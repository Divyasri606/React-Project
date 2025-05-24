const BASE_URL = 'http://localhost:5000/api';

// Fetch all users
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/get_data`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

// Create a new user
export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/save_data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}

// Update existing user by ID
export async function updateUser(userId, data) {
  const response = await fetch(`${BASE_URL}/modify_user/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
}

// Delete user by ID
export async function deleteUser(userId) {
  const response = await fetch(`${BASE_URL}/delete_user/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
}