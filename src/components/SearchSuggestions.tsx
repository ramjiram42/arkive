import React from 'react';

export const SearchSuggestions = () => {
  return (
    <div style={{ position: 'absolute', top: 50, width: '100%', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8, zIndex: 10 }}>
      <div style={{ padding: 8, cursor: 'pointer' }}>Recent: Financial Report</div>
      <div style={{ padding: 8, cursor: 'pointer' }}>Recent: Logos</div>
    </div>
  );
};
