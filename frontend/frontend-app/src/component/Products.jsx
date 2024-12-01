import React, { useEffect, useState } from 'react'
import Product from './Product'
import axios from 'axios'

export default function Products({ filter }) {
  const [products, setProducts] = useState([]); 
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:7000/showProducts')
    .then((response) => {
      setProducts(response.data);
      setSortedProducts(response.data);
    })
    .catch((error) => {
      console.error(`Error fetching product details:`, error);
    });
  },[])

  useEffect(() => {
    if (filter === '0') {
      setSortedProducts([...products].sort((a, b) => a.price - b.price));
    } else if (filter === '1') {
      setSortedProducts([...products].sort((a, b) => b.price - a.price));
    } else {
      setSortedProducts(products);
    }

  }, [filter, products]);

  return (
    <>
      {sortedProducts.map((product) => ( 
        <Product key={product._id} product={product}/>
      ))}
    </>
  )
}

