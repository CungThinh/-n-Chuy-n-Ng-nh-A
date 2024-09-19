'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Lấy danh sách người dùng từ API khi trang được load
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Hàm xử lý khi thêm người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!res.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await res.json();
      setUsers((prevUsers) => [...prevUsers, newUser]); // Cập nhật danh sách người dùng
      setEmail('');  // Reset lại form
      setName('');   // Reset lại form
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.name || 'No Name'}
          </li>
        ))}
      </ul>

      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}