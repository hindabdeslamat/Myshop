import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import products, { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initCat = searchParams.get('cat') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initCat);
  const [sort, setSort] = useState('default');
  const [priceMax, setPriceMax] = useState(10000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('cat') || 'all';
    setCategory(cat);
  }, [location.search]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    list = list.filter(p => p.price <= priceMax);
    list = list.filter(p => p.rating >= minRating);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'discount': list.sort((a, b) => b.sales - a.sales); break;
      default: break;
    }
    return list;
  }, [category, search, sort, priceMax, minRating]);

  return (
    <div className="products-page">
      {/* Page header */}
      <div className="products-page__header">
        <div>
          <h1>All Products</h1>
          <p>{filtered.length} products found</p>
        </div>
        <div className="products-page__search-wrap">
          <span className="products-page__search-icon">🔍</span>
          <input
            type="text"
            className="products-page__search"
            placeholder="Search laptops, brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="products-page__layout">
        {/* Sidebar filters */}
        <aside className="filters">
          <h3 className="filters__title">Filters</h3>

          <div className="filters__section">
            <h4>Category</h4>
            {categories.map(cat => (
              <label key={cat.id} className="filters__radio">
                <input
                  type="radio"
                  name="category"
                  checked={category === cat.id}
                  onChange={() => setCategory(cat.id)}
                />
                <span>{cat.icon} {cat.label}</span>
              </label>
            ))}
          </div>

          <div className="filters__section">
            <h4>Max Price: <strong>{priceMax.toLocaleString()} DH</strong></h4>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="filters__range"
            />
            <div className="filters__range-labels">
              <span>500 DH</span><span>10,000 DH</span>
            </div>
          </div>

          <div className="filters__section">
            <h4>Min Rating</h4>
            {[0, 3, 4, 4.5].map(r => (
              <label key={r} className="filters__radio">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(r)}
                />
                <span>{r === 0 ? 'All ratings' : `${r}★ & above`}</span>
              </label>
            ))}
          </div>

          <button
            className="btn-ghost btn-full"
            onClick={() => { setCategory('all'); setPriceMax(10000); setMinRating(0); setSearch(''); }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Products area */}
        <div className="products-page__main">
          {/* Category pills */}
          <div className="products-page__cats">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`cat-pill ${category === cat.id ? 'cat-pill--active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="products-page__toolbar">
            <span className="products-page__count">{filtered.length} results</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="products-page__sort"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="products-page__empty">
              <span>😕</span>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
