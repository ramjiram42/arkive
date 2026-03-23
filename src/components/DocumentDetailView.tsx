import React from 'react';

export const DocumentDetailView = ({ file, onClose }: any) => {
  if (!file) return null;
  return (
    <div style={{ padding: 24, background: 'var(--bg-sidebar)', borderLeft: '1px solid var(--border-color)', width: 300 }}>
      <h3>{file.name}</h3>
      <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Size: {file.size}</p>
      <p style={{ color: 'var(--text-secondary)' }}>Modified: {file.updated}</p>
      <button onClick={onClose} style={{ marginTop: 16, padding: '8px 16px', borderRadius: 4, background: 'var(--accent-color)', color: 'white', border: 'none' }}>Close</button>
    </div>
  );
};
