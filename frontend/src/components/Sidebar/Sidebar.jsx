import React from 'react';
import "../Sidebar/Sidebar.css";
import { NavLink, Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const Sidebar = ({ showNav, setShowNav }) => {

  const userId = sessionStorage.getItem('userId');


  return (
    <div className={`sidenav ${showNav ? 'active' : ''}`}>
    
      <div className="flex items-center justify-between mt-[25px] btncontainer">
        <Link to="/" className="bg-gray-10 rounded-full px-3 inline-block">
          <span className="font-[900] text-[24px]">
            Home <span className="font-[600] medium-20">Linker</span>
          </span>
        </Link>

        <IoClose className='closebtn' onClick={() => setShowNav(!showNav)} />
      </div>

      <ul className="mt-6 space-y-4">
        <li>
          <NavLink to="/home" >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist">
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/mybooking" >
            My Booking
          </NavLink>
        </li>
        <li>
          <NavLink to={`/myproperties/${userId}`} >
            My Properties
          </NavLink>
        </li>
         <li>
          <NavLink to="/userprofile" >
             Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
