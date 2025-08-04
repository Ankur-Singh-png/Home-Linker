import React, { useState } from 'react'


import "./Admin.css";

function Admin() {
    
//  const[users,setUsers]=useState[null];

 const users= [
    { 
    name:"Gaurav Dhyani",
    email:"gaurav@gmail.com",
     phone: "+91-9876543210",
     Properties: [
    {
     Id: 1,
     name: "2BHK Flat, Delhi",
     date: "2020-04-21",
     status: "Pending",
    },
    {
     Id: 2,
     name: "3BHK Flat, Mumbai",
     date: "2021-04-21",
     status: "Completed",
    }
    ]
 },
 {
    name:"Yash Agarwal",
    email:"yash@gmail.com",
     phone: "+91-9876543210",
     Properties: [
    {
     Id: 3,
     name: "5BHK Flat, Delhi",
     date: "2020-04-21",
     status: "Pending",
    },
    {
     Id: 4,
     name: "4BHK Flat, Mumbai",
     date: "2021-04-21",
     status: "Completed",
    }
    ]
 },
 {
    name:"Ankur ",
    email:"ankur@gmail.com",
     phone: "+91-9876543210",
     Properties: [
    {
     Id: 5,
     name: "2BHK Flat, Delhi",
     date: "2020-04-21",
     status: "Pending",
    },
    {
     Id: 6,
     name: "3BHK Flat, Mumbai",
     date: "2021-04-21",
     status: "Completed",
    }
    ]
 },
 {
    name:"Sreyas Hedau ",
    email:"sreyas@gmail.com",
     phone: "+91-9876543210",
     Properties: [
    {
     Id: 7,
     name: "2BHK Flat, Delhi",
     date: "2020-04-21",
     status: "Pending",
    },
    {
     Id: 8,
     name: "3BHK Flat, Mumbai",
     date: "2021-04-21",
     status: "Completed",
    }
    ]
 },
 {
    name:"Chetan ",
    email:"chetan@gmail.com",
    phone: "+91-9876543210",
     Properties: [
    {
     Id: 9,
     name: "2BHK Flat, Delhi",
     date: "2020-04-21",
     status: "Pending",
    },
    {
     Id: 10,
     name: "3BHK Flat, Mumbai",
     date: "2021-04-21",
     status: "Completed",
    }
    ]
 }
]
 
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/users`)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, []);


  return (
    <div className='container'>
      <h1 className='h'><b>All User Details</b></h1>
      <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Properties</th>
            </tr>
        </thead>
        <tbody>
           {users.map((u) =>
           u.Properties.map((p) => (
            <tr>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{p.name}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Admin
