import React, {useState} from 'react'
import Navbar from '../component/Navbar';
import Dropdown from '../component/Dropdown';
import Products from '../component/Products';
import Footer from '../component/Footer';
export default function ProductsPage() {
    const [filter, setFilter] = useState('');
  return (
    <div>
      <Navbar/>
      <div className='flex justify-between mt-14'>
        <p className='filter ml-2 lg:ml-10 lg:text-lg text-sm mt-16'>Filters</p>
        <div className='lg:mr-10 mr-2'>
        <Dropdown setFilter={setFilter} />
        </div>
      </div>
      <div className='flex justify-center items-center flex-wrap gap-[50px]'>
        <Products filter={filter} />
      </div>
      <Footer/>
    </div>
  )
}
