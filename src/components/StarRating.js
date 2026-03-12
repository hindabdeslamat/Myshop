import React from 'react';

export default function StarRating({ rating, count, size = 14 }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {stars.map(s => {
          const filled = s <= Math.floor(rating);
          const half = !filled && s === Math.ceil(rating) && rating % 1 >= 0.5;
          return (
            <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill="none">
              <defs>
                {half && (
                  <linearGradient id={`half-${s}`}>
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                )}
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? '#F59E0B' : half ? `url(#half-${s})` : '#D1D5DB'}
              />
            </svg>
          );
        })}
      </div>
      {count !== undefined && (
        <span style={{ fontSize: '12px', color: '#9CA3AF' }}>({count})</span>
      )}
    </div>
  );
}
