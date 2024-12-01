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
      <select value={selected} onChange={handleSelect} className='dropdown'>
        <option className='dropdown-ops' disabled selected hidden>Sort by</option>
        <option value="none" className='dropdown-ops'>None</option>
        <option value="0" className='dropdown-ops'>Price Low-High</option>
        <option value="1" className='dropdown-ops'>Price High-Low</option>
      </select>
    </>
  )
}
