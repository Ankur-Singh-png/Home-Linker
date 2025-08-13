import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdAddHome, MdHouse, MdPermContactCalendar } from 'react-icons/md'
import { RiCheckboxMultipleBlankFill } from "react-icons/ri"
import { FaUserShield } from "react-icons/fa"
import axios from 'axios'

const Navbar = ({ containerStyles }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = sessionStorage.getItem("token")
        if (token === null)
          navigate("/login")

        const userId = sessionStorage.getItem("userId");
        const res = await axios.get(`http://localhost:8080/user/getRole/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log("User role fetched:", res.data)
        setIsAdmin(res.data === "ROLE_ADMIN")
      } catch (err) {
        console.error("Error fetching user role:", err)
      }
    }

    fetchUserRole()
  }, [])

  return (
    <nav className={`${containerStyles}`}>
      <NavLink to="/home" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
        <MdHouse />
        <div>Home</div>
      </NavLink>

      <NavLink to="/listing" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
        <RiCheckboxMultipleBlankFill />
        <div>Listing</div>
      </NavLink>

      <NavLink to="/contactus" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
        <MdPermContactCalendar />
        <div>Contact</div>
      </NavLink>

      <NavLink to="/addproperty" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
        <MdAddHome />
        <div>Add Property</div>
      </NavLink>

      <NavLink to="/filters" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
        <MdAddHome />
        <div>Filters</div>
      </NavLink>

      {isAdmin && (
        <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer" : "flexCenter gap-x-1 rounded-full px-2 py-1 cursor-pointer"}>
          <FaUserShield />
          <div>Admin</div>
        </NavLink>
      )}
    </nav>
  )
}

export default Navbar
