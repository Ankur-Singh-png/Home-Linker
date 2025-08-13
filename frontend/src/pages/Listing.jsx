import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import { FaLocationDot } from 'react-icons/fa6'
import { getAllAvailableProperties } from '../services/Property'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Listing = () => {

  const [properties, setproperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults,setShowSearchResults] = useState(false)
  const [noResults, setNoResults] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const token = sessionStorage.getItem('token');
      if(token === null)
        navigate("/login")
    const fetchPropertiesByAvaliability = async () => {
      try {
        const res = await getAllAvailableProperties();
        setproperties(res.data);
        console.log("properties fetched:", res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
  
    fetchPropertiesByAvaliability();
  }, []);

 const handleSearch = async (e) => {
    setInput(e.target.value);
    if (input.trim().length >= 3) {
      setShowSearchResults(true)
    try {
      const response = await axios.get(`http://localhost:8080/property/search?keyword=${input}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <main className='max-padd-container my-[99px]'>
    <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
      <div>
      {/* SearchBar */}
        <div  className='flexBetween pl-6 h-[3.3rem] bg-white rounded-3xl w-full max-w-[366px] ring-1 ring-slate-500/5'>
        <input type='search'value={input} onChange={handleSearch} placeholder='Enter residency name/city/country' className='bg-transparent border-none outline-none w-full' />
        <FaLocationDot className='relative right-4 text-xl hover:text-secondary cursor-pointer'/>
        </div>

        {/* Container */}
<div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10'>
  {showSearchResults ? (
    searchResults.length > 0 ? (
      searchResults.map((property) => (
        <Item key={property.id} property={property} />
      ))
    ) : (
      noResults && (
        <p className="col-span-full text-center text-red-500 font-semibold">
          No Property with such Name
        </p>
      )
    )
  ) : (
    properties.map((property) => (
      <Item key={property.id} property={property} />
    ))
  )}
</div>

      </div>
    </div>
    </main>
  )
}

export default Listing
