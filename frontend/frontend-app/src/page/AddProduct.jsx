import React, { useState } from 'react';


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
      <form onSubmit = {onSubmit}>
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
      </form>
    </>
  )
}
