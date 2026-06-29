import React from 'react';
import { Search, X, Tag, SlidersHorizontal } from 'lucide-react';
import SortMenu from './SortMenu';

export const GENDERS = ['Women', 'Men', 'Kids', 'Unisex'];

export const PRICE_BUCKETS = [
  { key: 'u1000', label: 'Under ₹1,000' },
  { key: '1to3', label: '₹1,000 – ₹3,000' },
  { key: '3to5', label: '₹3,000 – ₹5,000' },
  { key: '5plus', label: '₹5,000+' },
];

const chip = (active) =>
  `inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
    active
      ? 'border-coral bg-coral text-white shadow-glow'
      : 'border-navy/15 bg-white text-navy hover:border-coral/40 hover:text-coral'
  }`;

export default function FilterSort({ filters, setFilters, count }) {
  const update = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const toggleGender = (g) =>
    setFilters((f) => ({
      ...f,
      genders: f.genders.includes(g)
        ? f.genders.filter((x) => x !== g)
        : [...f.genders, g],
    }));

  const activeCount =
    filters.genders.length +
    (filters.price ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.search ? 1 : 0);

  const clear = () =>
    setFilters((f) => ({ search: '', genders: [], price: null, onSale: false, sort: f.sort }));

  return (
    <div className="space-y-5">
      {/* Row 1 — search + count + sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <input
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Search products..."
            className="w-full rounded-full border border-navy/15 bg-white py-2.5 pl-10 pr-4 text-sm text-navy outline-none transition-all focus:border-coral focus:ring-2 focus:ring-coral/20"
          />
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-sm font-medium text-navy/50 sm:inline">
            {count} product{count === 1 ? '' : 's'}
          </span>
          <SortMenu value={filters.sort} onChange={(s) => update({ sort: s })} />
        </div>
      </div>

      {/* Row 2 — filter chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
          <SlidersHorizontal className="h-4 w-4 text-coral" /> Filters
        </span>

        {GENDERS.map((g) => (
          <button key={g} type="button" onClick={() => toggleGender(g)} className={chip(filters.genders.includes(g))}>
            {g}
          </button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-navy/10 sm:inline-block" />

        {PRICE_BUCKETS.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => update({ price: filters.price === b.key ? null : b.key })}
            className={chip(filters.price === b.key)}
          >
            {b.label}
          </button>
        ))}

        <button type="button" onClick={() => update({ onSale: !filters.onSale })} className={chip(filters.onSale)}>
          <Tag className="h-3.5 w-3.5" /> On Sale
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clear}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-coral transition-colors hover:bg-coral/10"
          >
            <X className="h-3.5 w-3.5" /> Clear all
          </button>
        )}
      </div>
    </div>
  );
}
