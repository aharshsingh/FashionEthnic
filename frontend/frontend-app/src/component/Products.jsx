import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import Product from './Product'
import Pagination from './Pagination'
import axios from 'axios'

const API_URL = 'https://fashionethnic.onrender.com/api/products/get_products';

function inBucket(price, key) {
  switch (key) {
    case 'u1000': return price < 1000;
    case '1to3': return price >= 1000 && price < 3000;
    case '3to5': return price >= 3000 && price < 5000;
    case '5plus': return price >= 5000;
    default: return true;
  }
}

// Apply filters + sort client-side (fallback when the API returns a plain array).
function applyClient(all, { search, genders, price, onSale, sort }) {
  let list = [...all];
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (p) => (p.name || '').toLowerCase().includes(q) || (p.about || '').toLowerCase().includes(q)
    );
  }
  if (genders.length) list = list.filter((p) => genders.includes(p.gender));
  if (price) list = list.filter((p) => inBucket(Number(p.price), price));
  if (onSale) list = list.filter((p) => Number(p.discount) > 0);

  switch (sort) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating': list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); break;
    case 'discount': list.sort((a, b) => Number(b.discount) - Number(a.discount)); break;
    default: break;
  }
  return list;
}

export default function Products({ filters = {}, onCount, pageSize = 12, paginate = true }) {
  const { search = '', genders = [], price = null, onSale = false, sort = 'featured' } = filters;
  const filtersKey = JSON.stringify({ search, genders, price, onSale, sort });

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // server mode state
  const [serverItems, setServerItems] = useState([]);
  const [serverMeta, setServerMeta] = useState({ totalPages: 1, total: 0 });
  // client mode state (full list fetched once)
  const [allItems, setAllItems] = useState(null);

  const modeRef = useRef(null); // 'server' | 'client'

  // Reset to first page whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [filtersKey]);

  // Fetch. In client mode the API ignores params (returns everything), so we
  // only fetch once; in server mode we refetch on page / filter / sort change.
  useEffect(() => {
    if (modeRef.current === 'client' && allItems) return;

    let cancelled = false;
    setLoading(true);

    const params = { page, limit: pageSize, sort };
    if (search) params.search = search;
    if (genders.length) params.gender = genders.join(',');
    if (price) params.price = price;
    if (onSale) params.onSale = true;

    axios
      .get(API_URL, { params })
      .then((res) => {
        if (cancelled) return;
        if (Array.isArray(res.data)) {
          modeRef.current = 'client';
          setAllItems(res.data);
        } else {
          modeRef.current = 'server';
          setServerItems(res.data.products || []);
          setServerMeta({
            totalPages: res.data.totalPages || 1,
            total: res.data.total || 0,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page, pageSize, filtersKey, search, genders, price, onSale, sort]);

  // Client-mode derived view.
  const clientView = useMemo(() => {
    if (modeRef.current !== 'client' || !allItems) return null;
    const list = applyClient(allItems, { search, genders, price, onSale, sort });
    const totalPages = Math.max(Math.ceil(list.length / pageSize), 1);
    const safePage = Math.min(page, totalPages);
    const start = paginate ? (safePage - 1) * pageSize : 0;
    const end = paginate ? start + pageSize : pageSize;
    return { items: list.slice(start, end), totalPages, total: list.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems, filtersKey, page, pageSize, paginate]);

  const isServer = modeRef.current === 'server';
  const items = isServer ? serverItems : (clientView?.items || []);
  const totalPages = isServer ? serverMeta.totalPages : (clientView?.totalPages || 1);
  const total = isServer ? serverMeta.total : (clientView?.total || 0);

  useEffect(() => {
    onCount?.(total);
  }, [total, onCount]);

  const changePage = (p) => {
    setPage(p);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-stretch justify-center gap-6 lg:gap-8">
        {loading && items.length === 0 ? (
          Array.from({ length: pageSize > 8 ? 8 : pageSize }).map((_, i) => (
            <div key={i} className="w-[250px] overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-soft">
              <div className="skeleton aspect-[3/4] w-full" />
              <div className="space-y-3 p-4">
                <div className="skeleton h-4 w-3/4 rounded-full" />
                <div className="skeleton h-4 w-1/3 rounded-full" />
              </div>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="flex w-full flex-col items-center rounded-3xl border border-navy/5 bg-white px-6 py-16 text-center shadow-soft">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-coral/10 text-coral">
              <PackageSearch className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-navy">No products found</h3>
            <p className="mt-2 max-w-sm text-sm text-navy/60">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        ) : (
          items.map((product) => <Product key={product._id} product={product} />)
        )}
      </div>

      {paginate && !loading && (
        <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onChange={changePage} />
      )}
    </div>
  )
}
