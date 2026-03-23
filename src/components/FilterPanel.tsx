import React from 'react';

export const FilterPanel = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <select style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
        <option>All Types</option>
        <option>Documents</option>
        <option>Images</option>
        <option>Videos</option>
      </select>
    </div>
  );
};
