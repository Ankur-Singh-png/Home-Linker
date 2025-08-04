import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import { MdOutlineBathtub, MdOutlineBed, MdOutlineGarage } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CgRuler } from 'react-icons/cg'

const Item = ({property}) => {
  return (
    <div className='rounded-2xl p-5 bg-white'>
        <div className='pb-2 relative'>
            <img src={property.image} alt={property.title} className='rounded-xl' />

            <h5 className='bold-16 my-1 text-secondary '> {property.city} </h5>
            <h4 className='medium-18 line-clamp-1'> {property.title} </h4>

            {/* Information */}
            <div className='flex gap-x-2 py-2'>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500] '><MdOutlineBed />{property.facilities.bedrooms}</div>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500] '><MdOutlineBathtub />{property.facilities.bathrooms}</div>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500] '><MdOutlineGarage />{property.facilities.parkings}</div>
                <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500] '><CgRuler /> 400 </div>
            </div>
        </div>
        <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
        <div className='flexBetween'>
            <div >₹{property.price}0000.00</div>
            <Link to={'/'}>
            <button className='btn-secondary rounded-xl !py-[6px] !px-4 shadow-sm'>View Details</button></Link>
        </div>
    </div>
  )
}

export default Item