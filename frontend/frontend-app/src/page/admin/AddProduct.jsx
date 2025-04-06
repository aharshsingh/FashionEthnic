import React, { useState } from 'react';
import { ImageUploadDemo } from '../../component/UploadFIle';

export default function AddProduct() {

    // const [file,setFile] = useState(null);

    // const onFileChange = (event) => {
    //     setFile(event.target.files[0]);
    // }
    const onSubmit = (event) => {
        event.preventDefault();
    };

    // const formData = new FormData();
    return (
    <>
      <div className='w-full pt-6 pb-20 pl-4 pr-4 lg:pt-12 lg:pb-32 lg:pl-48 lg:pr-48'>
        <div className="flex gap-2 flex-col">
          <h1 className='text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left'>Add Product</h1>
          <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Add new products to your store with ease. Fill in the product details and upload images to start selling instantly.
          </p>
        </div>
        <div className='mt-5 lg:mt-10'>
          <form>
            <div className='flex flex-wrap justify-between lg:flex-nowrap'>
              <div className='flex flex-wrap justify-center gap-5'>
                <div>
                  <div>
                    <p className='font-medium text-lg lg:text-2xl text-left'>Basic Info</p>
                  </div>
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Name</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>About Product</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Price</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Discount on Product</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                  </div>
                  <div>
                    <p className='font-medium text-lg lg:text-2xl text-left mt-5'>Material & Care</p>
                  </div>
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Material</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Care <span className='text-sm lg:text-base text-gray-500'>(Enter the type of care material needs)</span></label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className='font-medium text-lg lg:text-2xl text-left'>Appearance & Style</p>
                  </div>
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Colour</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Fit</label>
                      <select id="fit" class="w-96 bg-white border-1 border-[#999999] text-gray-900 text-sm rounded-sm p-2 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500 outline-none">
                        <option selected>Choose a fit type</option>
                        <option value="US">Slim fit</option>
                        <option value="CA">Regular fit</option>
                        <option value="FR">Loose fit</option>
                      </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Gender</label>
                      <select id="gender" class="w-96 bg-white border-1 border-[#999999] text-gray-900 text-sm rounded-sm p-2 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500 outline-none">
                        <option selected>Choose a gender</option>
                        <option value="US">Male</option>
                        <option value="CA">Female</option>
                      </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Size</label>
                      <select id="size" class="w-96 bg-white border-1 border-[#999999] text-gray-900 text-sm rounded-sm p-2 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500 outline-none">
                        <option selected>Choose a size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className='font-medium text-lg lg:text-2xl text-left mt-5'>Rating</p>
                  </div>
                  <div className='flex flex-col gap-3 mt-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-base font-medium'>Product Rating</label>
                      <input className='rounded-sm border-1 border-[#999999] w-96 h-10 outline-none pl-2' type='text'/>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ImageUploadDemo />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <form onSubmit = {onSubmit}>
        <label>Name</label>
        <input type='text' placeholder='Enter product name'/>
        <label>Price</label>
        <input type='text' placeholder='Enter product price' />
        <label>about</label>
        <input type='text' placeholder='Enter product information' />
        <label>material</label>
        <input type='text' placeholder='eg. cotton' />
        <label>care</label>
        <input type='text' placeholder='Enter product name' />
        <label>colour</label>
        <input type='text' placeholder='Enter product name' />
        <label>gender</label>
        <input type='text' placeholder='Enter product name' />
        <label>fit</label>
        <input type='text' placeholder='Enter product name' />
        <label>size</label>
        <input type='text' placeholder='Enter product name' />
        <label>rating</label>
        <input type='text' placeholder='Enter product name' />
        <label>discount</label>
        <input type='text' placeholder='Enter product name' />
        <label>image</label>
        <input type="file" name="image" accept="image/*" />
        <button>Submit</button>
      </form> */}
    </>
  )
}
