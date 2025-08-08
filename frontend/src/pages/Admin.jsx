import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const url = `http://localhost:8080/admin/dashboard`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Failed to fetch user details");
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="p-6 bg-white-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8" style={{ color: '#8AC243' }}>
        All User Details
      </h1>
      <div className="overflow-x-auto mx-auto max-w-6xl">
        <table className="min-w-full border border-gray-200 bg-white shadow-lg rounded-lg">
          <thead style={{ backgroundColor: '#8AC243' }} className="text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold" >ID</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-left font-semibold">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr style={{ backgroundColor: '#8AC243' }}
                key={u.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
              >
                <td className="py-3 px-4 text-gray-800">{u.id}</td>
                <td className="py-3 px-4 text-gray-800">{u.firstName} {u.lastName}</td>
                <td className="py-3 px-4 text-gray-600">{u.email}</td>
                <td className="py-3 px-4 text-gray-600">{u.phoneNumber}</td>
                <td className="py-3 px-4 text-gray-600">{u.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
