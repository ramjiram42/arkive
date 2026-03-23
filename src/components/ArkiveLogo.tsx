import React from 'react';
import { Archive } from 'lucide-react';

export const ArkiveLogo = () => (
  <div className="brand" style={{ display: 'flex', alignItems: 'center' }}>
    <Archive className="mr-3" style={{ color: 'var(--accent-color)', marginRight: '8px' }} />
    <span>ARKIVE</span>
  </div>
);
