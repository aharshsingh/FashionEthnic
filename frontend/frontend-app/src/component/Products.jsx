import React, { useEffect, useMemo, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import Product from './Product'
import axios from 'axios'

function inBucket(price, key) {
  switch (key) {
    case 'u1000': return price < 1000;
    case '1to3': return price >= 1000 && price < 3000;
    case '3to5': return price >= 3000 && price < 5000;
    case '5plus': return price >= 5000;
    default: return true;
  }
}

export default function Products({ filters = {}, onCount }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fashionethnic.onrender.com/api/products/get_products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching product details:`, error);
        setLoading(false);
      });
  }, [])

  const { search = '', genders = [], price = null, onSale = false, sort = 'featured' } = filters;

  const visible = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) => (p.name || '').toLowerCase().includes(q) || (p.about || '').toLowerCase().includes(q)
      );
    }
    if (genders.length) {
      list = list.filter((p) => genders.includes(p.gender));
    }
    if (price) {
      list = list.filter((p) => inBucket(Number(p.price), price));
    }
    if (onSale) {
      list = list.filter((p) => Number(p.discount) > 0);
    }

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); break;
      case 'discount': list.sort((a, b) => Number(b.discount) - Number(a.discount)); break;
      default: break;
    }

    return list;
  }, [products, search, genders, price, onSale, sort]);

  useEffect(() => {
    onCount?.(visible.length);
  }, [visible.length, onCount]);

  if (loading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[250px] overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
            <div className="skeleton aspect-[3/4] w-full" />
            <div className="space-y-3 p-4">
              <div className="skeleton h-4 w-3/4 rounded-full" />
              <div className="skeleton h-4 w-1/3 rounded-full" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (!visible.length) {
    return (
      <div className="flex w-full flex-col items-center rounded-3xl border border-navy/5 bg-white px-6 py-16 text-center shadow-soft">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-coral/10 text-coral">
          <PackageSearch className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-navy">No products found</h3>
        <p className="mt-2 max-w-sm text-sm text-navy/60">
          Try adjusting your filters or search terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <>
      {visible.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </>
  )
}
