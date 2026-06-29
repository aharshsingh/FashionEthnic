import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Ordersnippet({ order }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://fashionethnic.onrender.com/api/products/detail/${order.productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (order?.productId) getProduct();
  }, [order?.productId]);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-navy/5 bg-cream/50 p-3">
      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-sand">
        {product.image && (
          <img className="h-full w-full object-cover" src={product.image} alt={product.name || 'product'} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-navy">{product.name || 'Loading...'}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-navy/50">{product.about}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-navy/5 px-2 py-0.5 font-semibold text-navy">
            Size: {order.size || product.size || '-'}
          </span>
          <span className="rounded-full bg-navy/5 px-2 py-0.5 font-semibold text-navy">
            Qty: {order.quantity}
          </span>
        </div>
      </div>
      {product.price != null && (
        <p className="shrink-0 font-display text-base font-bold text-navy">Rs.{product.price}</p>
      )}
    </div>
  );
}
