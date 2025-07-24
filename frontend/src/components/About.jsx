import React, { useEffect, useState } from 'react'
import aboutImg from "../assets/about.jpg"
import { RiDoubleQuotesL } from 'react-icons/ri'
import CountUp from "react-countup"

const About = () => {

    const statistics = [
        {label: "Happy Clients", value: 12},
        {label: "Different Cities", value: 3},
        {label: "Projects Completed", value: 45}
    ]

    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            if(aboutSection){
                const top = aboutSection.getBoundingClientRect().top;
                const isVisible = top < window.innerHeight - 100;
                setIsVisible(isVisible);
            }
        };
        window.addEventListener("scroll",handleScroll);
        //Cleanup function to remove the event listener

        return()=>{
            window.removeEventListener("scroll",handleScroll);
        }
    },[])

  return (
    <section className='max-padd-container py-16 xl:py-28'>
        {/* Container */}
        <div className='flex flex-col xl:flex-row gap-10'>
            {/* Left Side */}
            <div className='flex-1 relative'>
                <img src={aboutImg} alt='' className='rounded-3xl rounded-tr-[155px] w-[488px]'></img>
                <div className='bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col'>
                    <span className='relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex item-center rounded-full'><RiDoubleQuotesL className='text-2xl'/></span>
                    <p className='text-center relative bottom-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1 flex justify-center flex-col'>
                <span className='medium-18'>Unveiling Our Journey</span>
                <h2 className='h2'>Our Commitment Crafting Extraordinary Real Estate Experiences</h2>
                <p className='py-5'>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>


                {/* Statistics Container */}
                <div className='flex flex-wrap gap-4'>
                    {statistics.map((statistic, index) =>(
                        <div key={index} className='bg-primary p-4 rounded-lg'>
                            <div className='flex items-center gap-1'>
                                <CountUp start={isVisible ? 0 : null} end={statistic.value} delay={3}>
                                {({countUpRef}) =>(
                                    <h3 ref={countUpRef}
                                    className='text-2xl font-semibold'
                                    ></h3>
                                )}
                                </CountUp>
                                <h4 className='bold-22'>k+</h4>
                            </div>
                            <p>{statistic.label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </section>
  )
}

export default About