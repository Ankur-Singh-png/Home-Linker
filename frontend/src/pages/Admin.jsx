import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const navigate = useNavigate();

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

  const getAllQueries = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const url = `http://localhost:8080/admin/getQuery`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQueries(res.data);
      console.log("Queries fetched successfully:", res.data);
    } catch (err) {
      console.error("Failed to fetch queries", err);
      toast.error("Failed to fetch queries");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
      if(token === null)  
        navigate("/login")
    
    getAllUsers();
    getAllQueries();
  }, []);

  return (
    <div className="p-6 bg-white-50 min-h-screen">
      {/* ===== Users Table ===== */}
      <h1 className="text-2xl font-bold text-center mb-8" style={{ color: '#8AC243' }}>
        All User Details
      </h1>
      <div className="overflow-x-auto mx-auto max-w-6xl mb-12">
        <table className="min-w-full border border-gray-200 bg-white shadow-lg rounded-lg">
          <thead style={{ backgroundColor: '#8AC243' }} className="text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-left font-semibold">Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="bg-white hover:bg-green-50 transition">
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

      {/* ===== Queries Table ===== */}
      <h1 className="text-2xl font-bold text-center mb-8" style={{ color: '#8AC243' }}>
        All Queries
      </h1>
      <div className="overflow-x-auto mx-auto max-w-6xl">
        <table className="min-w-full border border-gray-200 bg-white shadow-lg rounded-lg">
          <thead style={{ backgroundColor: '#8AC243' }} className="text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">First Name</th>
              <th className="py-3 px-4 text-left font-semibold">Last Name</th>
              <th className="py-3 px-4 text-left font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id} className="bg-white hover:bg-green-50 transition">
                <td className="py-3 px-4 text-gray-800">{q.id}</td>
                <td className="py-3 px-4 text-gray-800">{q.first_name}</td>
                <td className="py-3 px-4 text-gray-800">{q.last_name}</td>
                <td className="py-3 px-4 text-gray-600">{q.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
