import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Build a compact page list with ellipses, e.g. [1, '…', 4, 5, 6, '…', 12]
function getPageList(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) pages.push('…');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('…');
  pages.push(totalPages);
  return pages;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  const pages = getPageList(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex w-full flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-10 items-center gap-1 rounded-full border border-navy/15 bg-white px-4 text-sm font-semibold text-navy transition-all hover:border-coral/40 hover:text-coral disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-navy/15 disabled:hover:text-navy"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {pages.map((p, idx) =>
        p === '…' ? (
          <span key={`e${idx}`} className="grid h-10 w-10 place-items-center text-navy/40">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-all ${
              p === page
                ? 'bg-coral text-white shadow-glow'
                : 'border border-navy/15 bg-white text-navy hover:border-coral/40 hover:text-coral'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="inline-flex h-10 items-center gap-1 rounded-full border border-navy/15 bg-white px-4 text-sm font-semibold text-navy transition-all hover:border-coral/40 hover:text-coral disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-navy/15 disabled:hover:text-navy"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
