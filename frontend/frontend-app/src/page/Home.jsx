import React, {useState} from 'react'
import Navbar from '../component/Navbar'
import '../component-css/Home.css'
import homeimg from '../photo/K15R-_1_600x.webp'
import {Link} from 'react-router-dom'
import Footer from '../component/Footer'
import Products from '../component/Products'
import Pagination from '../component/Paginationcount'
import Dropdown from '../component/Dropdown';

export default function Home() {
  const [filter, setFilter] = useState('');


  return (
    <>
    <Navbar/>
    <div className='flex justify-around'>
      <div>
      <p className='text-[#132C48] mt-28 text-5xl lg:font-bold lg:text-[90px] lg:mt-[150px]' style={{textShadow: "2px 2px rgba(0, 0, 0, 0.25)"}} >Vibrant. Cultural.<br/> Trendsetting.</p>
      <p className='lg:text-2xl ml-2 text-sm mt-3'>Elevate your style, celebrate diversity-<br/>where tradition meets trends in every thread.</p>
      <Link className='-ml-[70px]' to='/Products'><button className='bg-[#FE8551] text-xs lg:text-lg p-2 lg:p-3 w-32 lg:w-64 rounded-full text-[#132C48] font-bold mt-14 m-20 lg:h-16'>Shop New Arrivals</button></Link>
      </div>
      <img className='mt-[100px] h-[750px] lg:block hidden' style={{boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25)"}} src={homeimg} alt="img" />
    </div>
    <div className='flex justify-center items-center'>
    <div className='line mt-24 lg:mt-[200px]'></div>
    </div>
    <div className='flex justify-between'>
      <button className='filter ml-2 lg:ml-10 lg:text-lg text-sm mt-16'>Filters</button>
      <div className='lg:mr-10 mr-2'>
      <Dropdown setFilter={setFilter} />
      </div>
    </div>
    <div className='flex justify-center items-center flex-wrap gap-[50px]'>
    <Products filter={filter} />
    </div>
    {/* <div className='paginationcount'>
    <Pagination/>
    </div> */}
    <Footer/>
    </>
  )
}
