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
      <p className='text-[#132C48] lg:font-bold lg:text-[90px] lg:mt-[150px]' style={{textShadow: "2px 2px rgba(0, 0, 0, 0.25)"}} >Vibrant. Cultural.<br/> Trendsetting.</p>
      <p className='text-2xl ml-4'>Elevate your style, celebrate diversity-<br/>where tradition meets trends in every thread.</p>
      <Link className='-ml-[70px]' to='/Products'><button className='bg-[#FE8551] text-lg p-3 w-64 rounded-full text-[#132C48] font-bold mt-14 m-20'>Shop New Arrivals</button></Link>
      </div>
      <img className='mt-[100px] h-[750px]' style={{boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.25)"}} src={homeimg} alt="img" />
    </div>
    <div className='line'></div>
    <div className='filter-container'>
      <button className='filter'>FILTERS</button>
      <Dropdown setFilter={setFilter} />
    </div>
    <div className='product-container'>
    <Products filter={filter} />
    </div>
    <div className='paginationcount'>
    <Pagination/>
    </div>
    {/* <CardCarousel/> */}
    <Footer/>
    </>
  )
}
