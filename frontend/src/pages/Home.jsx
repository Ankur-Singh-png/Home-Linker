import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Properties from '../components/Properties'
import Blogs from '../components/Blogs'

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Properties/>
      <Blogs />
    </main>
  )
}

export default Home