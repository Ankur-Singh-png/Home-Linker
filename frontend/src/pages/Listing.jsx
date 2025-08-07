import React, { useEffect, useState } from 'react'
import { PROPERTIES } from '../constants/data'
import Item from '../components/Item'
import { FaLocationDot } from 'react-icons/fa6'
import { getAllPropertiesByDate } from '../services/Property'


const Listing = () => {

  const [properties, setproperties] = useState([]);


  useEffect(() => {
    const fetchPropertiesByDate = async () => {
      try {
        const res = await getAllPropertiesByDate();
        setproperties(res.data);
        console.log("properties fetched:", res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
  
    fetchPropertiesByDate();
  }, []);


  return (
    <main className='max-padd-container my-[99px]'>
    <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
      <div>
      {/* SearchBar */}
        <div  className='flexBetween pl-6 h-[3.3rem] bg-white rounded-3xl w-full max-w-[366px] ring-1 ring-slate-500/5'>
        <input type='text' placeholder='Enter residency name/city/country' className='bg-transparent border-none outline-none w-full' />
        <FaLocationDot className='relative right-4 text-xl hover:text-secondary cursor-pointer'/>
        </div>

        {/* Container */}
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10'>
          {
            properties.map((property)=>(
                <Item key={property.title} property={property}/> 
              )
            )
          }
        </div>
      </div>
    </div>
    </main>
  )
}

export default Listing
