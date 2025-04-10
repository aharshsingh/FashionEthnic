import React from 'react'
import Tableproducts from '../../component/Tableproducts'
export default function products() {
  return (
    <div className='w-full pt-6 pb-20 pl-4 pr-4 lg:pt-12 lg:pb-32 lg:pl-48 lg:pr-48'>
      <div className="flex gap-2 flex-col">
          <h1 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>Products List</h1>
          <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Add new products to your store with ease. Fill in the product details and upload images to start selling instantly.
          </p>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <Tableproducts/>
        </div>
    </div>
  )
}
