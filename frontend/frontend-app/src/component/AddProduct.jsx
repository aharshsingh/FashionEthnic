import React from 'react';
import { useState } from 'react';

export default function addProduct() {

    const [file,setFile] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    };

    const formData = new FormData();
    return (
    <>
      <form onSubmit = {onSubmit}>
        <label>Name</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>Price</label>
        <input type='text' placeholder='Enter product price'></input>
        <label>about</label>
        <input type='text' placeholder='Enter product information'></input>
        <label>material</label>
        <input type='text' placeholder='eg. cotton'></input>
        <label>care</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>colour</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>gender</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>fit</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>size</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>rating</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>discount</label>
        <input type='text' placeholder='Enter product name'></input>
        <label>image</label>
        <input type="file" name="image" accept="image/*"></input>
        <input type='submit'>Submit</input>
      </form>
    </>
  )
}
