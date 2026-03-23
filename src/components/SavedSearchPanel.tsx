import React from 'react';
import { Bookmark } from 'lucide-react';

export const SavedSearchPanel = () => {
  return (
    <div style={{ padding: 16, border: '1px solid var(--border-color)', borderRadius: 8, marginTop: 16 }}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Bookmark size={16}/> Saved Searches</h4>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 8, color: 'var(--accent-color)', fontSize: '0.9rem' }}>
        <li style={{ cursor: 'pointer', marginBottom: 4 }}># Q4 Reports</li>
        <li style={{ cursor: 'pointer' }}># Brand Guidelines</li>
      </ul>
    </div>
  );
};
