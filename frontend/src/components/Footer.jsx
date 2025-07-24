import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants/data'

const FooterColumn = ({title, children}) =>{
  return (
    <div className='flex flex-col gap-5'>
      <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
      {children}
    </div>
  )
}
 
const Footer = () => {
  return (
    <footer className='max-padd-container mb-4'>
      <div className='max-padd-container bg-primary rounded-tr-3xl pt-12 xl:pt-20 pb-8'>
        <h3 className='h3'>Explore real estate oppurtunities with us?</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <hr className='my-8 bg-slate-900/30 h-[2px]'/>
        {/* Container */}
        <div className='flex justify-between flex-wrap gap-x-2 gap-y-8'>
          <div style={{maxWidth:'50rem'}}>
            <Link to={'/'} className='flex item-center gap-x-2'><span className='font-[900] text-[24px]'>Home<span className='font-[600] medium-20'>Linker</span></span></Link>
            <p className='py-4'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className='flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5'>
              <input type="email" placeholder='Enter your email' className='bg-transparent border-none outline-none'/>

              <button className='btn-secondary rounded-full relative right-[0.33rem] '>Subscribe</button>
            </div>
          </div>
          <div className='flex justify-between flex-wrap gap-8'>
          {
            FOOTER_LINKS.map((col) => (
              <FooterColumn key={col.title} title={col.title}>
                <ul className='flex flex-col gap-4 regular-14 text-gray-20'>
                   {
                    col.links.map((link)=>(
                      <Link to={'/'} key={link}>{link}</Link>
                    ))}
                </ul>
              </FooterColumn>
            ))
          }
          <div className='flex flex-col gap-5'>
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {
                FOOTER_CONTACT_INFO.links.map((link)=>(
                <Link to={'/'} key={link.label} className='flex gap-4 md:flex-col lg:flex-row'>
                  <p>{link.label}</p>:<p>{link.value}</p>
                </Link>
               ))
              }
            </FooterColumn>
          </div>

          <div className='flex'>
            <FooterColumn title={SOCIALS.title}>
              <ul className='flex gap-4'>
                {
                  SOCIALS.links.map((link) => (
                    <Link to={'/'} key={link.id} className='text-xl'>
                      {link.icon}
                    </Link>
                  ))
                }
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>
    </div>
          {/* Copyright */}
          <p className='text-white bg-tertiary medium-14 py-2 px-8 rounded-h 3xl flexBetween'><span>2025 HomeLinker</span>All Rights Reserved</p>
    </footer>
  )
}

export default Footer

