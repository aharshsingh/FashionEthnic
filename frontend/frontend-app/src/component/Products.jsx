import React, { useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([]); // Initialize with an empty array

  useEffect(() => {
    axios.get('http://localhost:7000/showProducts')
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error(`Error fetching product details:`, error);
    });
  }, []);

  return (
    <>
      {products.map((product) => ( 
        <Product key={product._id} product={product}/>
      ))}
    </>
  )
}

