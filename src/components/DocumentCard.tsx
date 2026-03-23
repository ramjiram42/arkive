import React from 'react';
import { Star, MoreVertical, FileText, ImageIcon, Video } from 'lucide-react';

export const DocumentCard = ({ file, toggleStar }: any) => {
  const getFileIcon = (type: string) => {
    if (type === 'doc') return <FileText size={24} />;
    if (type === 'img') return <ImageIcon size={24} />;
    return <Video size={24} />;
  };

  return (
    <div className="file-card">
      <div className="file-card-header">
        <div className={`file-icon ${file.type}`}>
          {getFileIcon(file.type)}
        </div>
        <button className="icon-btn" style={{ width: 32, height: 32 }}><MoreVertical size={18} /></button>
      </div>
      <div>
        <div className="file-name" title={file.name}>{file.name}</div>
        <div className="file-meta" style={{ marginTop: 8 }}>
          <span className={`badge ${file.type}`}>{file.type}</span>
          <button className={`star-btn ${file.starred ? 'starred' : ''}`} onClick={(e) => toggleStar(e, file.id)}>
            <Star size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
