import React, { useState, useMemo } from 'react';
import {
  Home, Star, Clock, Users, Archive, Search, Settings, Moon, Sun,
  Menu, LayoutGrid, List, MoreVertical, FileText, Image as ImageIcon, Video, Filter, ChevronUp, ChevronDown
} from 'lucide-react';

const MOCK_FILES = [
  { id: 1, name: 'Q4 Financial Report.pdf', type: 'doc', size: '2.4 MB', updated: '2025-10-15', starred: true, shared: false },
  { id: 2, name: 'Project Alpha Assets.zip', type: 'img', size: '14.5 MB', updated: '2025-10-14', starred: false, shared: true },
  { id: 3, name: 'Team Offsite Recording.mp4', type: 'vid', size: '245.0 MB', updated: '2025-10-10', starred: false, shared: true },
  { id: 4, name: 'Marketing Strategy 2026.docx', type: 'doc', size: '1.1 MB', updated: '2025-10-18', starred: true, shared: false },
  { id: 5, name: 'Logo Redesign Concepts', type: 'img', size: '8.2 MB', updated: '2025-10-12', starred: false, shared: false },
  { id: 6, name: 'Archived Contracts 2024.pdf', type: 'doc', size: '4.5 MB', updated: '2024-12-01', starred: false, shared: false, archive: true },
  { id: 7, name: 'Client Presentation.pptx', type: 'doc', size: '5.6 MB', updated: '2025-10-19', starred: false, shared: true },
  { id: 8, name: 'Onboarding Video.mp4', type: 'vid', size: '120.0 MB', updated: '2025-09-01', starred: true, shared: false },
  { id: 9, name: 'Website Banner.png', type: 'img', size: '2.8 MB', updated: '2025-10-20', starred: false, shared: true },
  { id: 10, name: 'Employee Handbook.pdf', type: 'doc', size: '3.1 MB', updated: '2025-01-15', starred: false, shared: false },
  { id: 11, name: 'Q3 Analytics.xlsx', type: 'doc', size: '1.8 MB', updated: '2025-09-30', starred: false, shared: false },
  { id: 12, name: 'Old Branding Guidelines.pdf', type: 'doc', size: '12.0 MB', updated: '2023-05-10', starred: false, shared: false, archive: true },
];

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  };

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'starred', icon: Star, label: 'Starred' },
    { id: 'recent', icon: Clock, label: 'Recent' },
    { id: 'shared', icon: Users, label: 'Shared' },
    { id: 'archive', icon: Archive, label: 'Archive' },
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleStar = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    // Normally would update state, for UI demo we just mock it.
  };

  const filteredFiles = useMemo(() => {
    let result = MOCK_FILES;
    
    // View filtering
    if (currentView === 'home') result = result.filter(f => !f.archive);
    if (currentView === 'starred') result = result.filter(f => f.starred);
    if (currentView === 'archive') result = result.filter(f => f.archive);
    if (currentView === 'shared') result = result.filter(f => f.shared);
    if (currentView === 'recent') {
      result = [...result].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()).slice(0, 5);
    }

    // Search filtering
    if (searchQuery) {
      result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sorting
    if (sortConfig) {
      result.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [currentView, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage) || 1;
  const paginatedFiles = filteredFiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getFileIcon = (type: string) => {
    if (type === 'doc') return <FileText size={24} />;
    if (type === 'img') return <ImageIcon size={24} />;
    return <Video size={24} />;
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="brand">
          <Archive className="mr-3" style={{ color: 'var(--accent-color)' }} />
          <span>ARKIVE</span>
        </div>
        
        <nav className="nav-links">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => { setCurrentView(item.id); setCurrentPage(1); }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="user-details">
            <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>John Doe</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Pro Plan</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="icon-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Menu size={20} />
            </button>
            <div className="search-bar">
              <Search size={18} style={{ color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search files, folders, or recent..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
          <div className="header-right" style={{ display: 'flex', gap: '12px' }}>
            <button className="icon-btn"><Filter size={20} /></button>
            <button className="icon-btn" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn"><Settings size={20} /></button>
          </div>
        </header>

        <div className="actions-bar">
          <h1 className="view-title">
            {menuItems.find(m => m.id === currentView)?.label || 'Files'}
          </h1>
          <div className="view-controls">
            <div style={{ display: 'flex', background: 'var(--bg-sidebar)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <button 
                className="icon-btn" 
                style={{ borderRadius: 0, padding: '8px', width: 'auto', height: 'auto', backgroundColor: viewMode === 'list' ? 'var(--hover-bg)' : '' }}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
              <button 
                className="icon-btn" 
                style={{ borderRadius: 0, padding: '8px', width: 'auto', height: 'auto', backgroundColor: viewMode === 'grid' ? 'var(--hover-bg)' : '' }}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="data-area">
          {viewMode === 'grid' ? (
            <div className="file-grid">
              {paginatedFiles.map(file => (
                <div key={file.id} className="file-card">
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
              ))}
            </div>
          ) : (
            <div className="file-list">
              <div className="list-header">
                <div className="sortable-header" onClick={() => handleSort('name')}>
                  Name {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
                <div className="sortable-header" onClick={() => handleSort('updated')}>
                  Modified {sortConfig?.key === 'updated' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
                <div className="sortable-header" onClick={() => handleSort('size')}>
                  Size {sortConfig?.key === 'size' && (sortConfig.direction === 'asc' ? <ChevronUp size={14}/> : <ChevronDown size={14}/>)}
                </div>
                <div>Category</div>
                <div></div>
              </div>
              {paginatedFiles.map(file => (
                <div key={file.id} className="list-item">
                  <div className="list-item-name">
                    <div className={`list-item-icon ${file.type}`}>
                      {getFileIcon(file.type)}
                    </div>
                    <span>{file.name}</span>
                  </div>
                  <div>{file.updated}</div>
                  <div>{file.size}</div>
                  <div><span className={`badge ${file.type}`}>{file.type}</span></div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button className={`star-btn ${file.starred ? 'starred' : ''}`} onClick={(e) => toggleStar(e, file.id)}>
                      <Star size={16} />
                    </button>
                    <button className="icon-btn" style={{ width: 32, height: 32 }}><MoreVertical size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {paginatedFiles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-secondary)' }}>
              No files found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <div>Showing page {currentPage} of {totalPages} ({filteredFiles.length} items)</div>
              <div className="page-controls">
                <button 
                  className="page-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i} 
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
