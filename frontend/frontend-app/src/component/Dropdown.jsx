import React, { useState } from 'react'

export default function Dropdown({ setFilter }) {
  const [selected, setSelected] = useState('');

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelected(value);
    setFilter(value);  
  };
  return (
    <>
      <select value={selected} onChange={handleSelect} className='dropdown lg:h-10 mt-14 w-24 lg:w-52 p-2 lg:text-base text-sm'>
        <option className='dropdown-ops' disabled selected hidden>Sort by</option>
        <option value="none" className='dropdown-ops'>Sort by</option>
        <option value="0" className='dropdown-ops'>Price Low-High</option>
        <option value="1" className='dropdown-ops'>Price High-Low</option>
      </select>
    </>
  )
}
