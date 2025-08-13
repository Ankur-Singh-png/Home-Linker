import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Properties from '../components/Properties'
import Blogs from '../components/Blogs'
import bannerImg from '../assets/banner.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() =>{
    const token = sessionStorage.getItem('token');
      if(token === null)
        navigate("/login")
  },[]);
  return (
    <main>
      <Hero />
      <About />
      <Properties/>
      <Blogs />
  
     <div className='max-padd-container py-16 overflow-x-hidden'>
        <img src={bannerImg}/>
     </div>
   </main>
  )
}

export default Home
