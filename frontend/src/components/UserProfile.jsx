// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
//   const { userId } = useParams(); 
//   const [user, setUser] = useState(null);

 const user = {
    name: "Gaurav Dhyani",
    email: "gaurav@example.com",
    phone: "+91-9876543210",
    joined: "2019-03-15",
    interestedProperties: [
      {
        id: 1,
        name: "2BHK Flat, Delhi",
        date: "2020-04-21",
        status: "Pending",
      },
      {
        id: 2,
        name: "3BHK Villa, Mumbai",
        date: "2021-05-03",
        status: "Confirmed",
      },
      {
        id: 2,
        name: "3BHK Villa, Gurgaon",
        date: "2022-07-12",
        status: "Confirmed",
      },
      {
        id: 2,
        name: "2BHK Villa, Delhi",
        date: "2023-12-05",
        status: "Pending",
      },
      {
        id: 2,
        name: "3BHK Villa, Noida",
        date: "2024-05-16",
        status: "Confirmed",
      },
    ],
  };


//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/users/${userId}`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [userId]);

  return (
    <div className="profile-container">
      <div className="user-details">
        <h2><b>{user.name}</b></h2>
        <p>Phone:{user.phone}</p>
        <p>Joined: {user.joined}</p>
      </div>

      <div className="property">
        <h3 className="interested">Properties</h3>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {user.interestedProperties.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.date}</td>
                <td>
                  <span className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;