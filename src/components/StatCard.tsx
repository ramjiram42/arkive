import React from 'react';

export const StatCard = ({ title, value }: any) => {
  return (
    <div style={{ padding: 16, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--card-bg)' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{title}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
};
