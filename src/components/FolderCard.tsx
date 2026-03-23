import React from 'react';
import { Folder } from 'lucide-react';

export const FolderCard = ({ defaultOpen = false }: any) => {
  return (
    <div className="file-card" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
      <Folder size={32} color="var(--accent-color)" />
      <div style={{ marginLeft: 12 }}>
        <div style={{ fontWeight: 600 }}>Project Assets</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>12 files</div>
      </div>
    </div>
  );
};
