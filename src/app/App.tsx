import { useState, useMemo, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Separator } from "./components/ui/separator";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Search,
  Bell,
  Settings,
  FolderOpen,
  FileText,
  Home,
  Star,
  Clock,
  Filter,
  Grid3x3,
  List,
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  Users,
  HardDrive,
  ChevronRight,
  ChevronLeft,
  Folder,
  BarChart3,
  ArrowUpRight,
  FileIcon,
  Archive,
  X,
  Menu,
  PanelLeftClose,
  PanelLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Database,
  ChevronsRight,
  ChevronsLeft,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";
import { ArkiveLogo } from "./components/ArkiveLogo";
import { DocumentDetailView } from "./components/DocumentDetailView";
import { StatCard } from "./components/StatCard";
import { FilterPanel, FilterState } from "./components/FilterPanel";
import { SearchSuggestions } from "./components/SearchSuggestions";
import { SavedSearchPanel } from "./components/SavedSearchPanel";
import exampleImage from "../assets/56bd71699f13ae142d103acf0bac5fbb11a9d952.png";

// Color mapping for document categories
const categoryColors: Record<string, { gradient: string; icon: string; text: string; bg: string }> = {
  "hr": {
    gradient: "from-blue-500 to-cyan-500",
    icon: "bg-blue-500",
    text: "text-blue-600",
    bg: "bg-blue-50"
  },
  "finance": {
    gradient: "from-emerald-500 to-teal-500",
    icon: "bg-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  "legal": {
    gradient: "from-violet-500 to-purple-500",
    icon: "bg-violet-500",
    text: "text-violet-600",
    bg: "bg-violet-50"
  },
  "marketing": {
    gradient: "from-orange-500 to-amber-500",
    icon: "bg-orange-500",
    text: "text-orange-600",
    bg: "bg-orange-50"
  },
  "enrollment": {
    gradient: "from-indigo-500 to-blue-500",
    icon: "bg-indigo-500",
    text: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  "accounts": {
    gradient: "from-pink-500 to-rose-500",
    icon: "bg-pink-500",
    text: "text-pink-600",
    bg: "bg-pink-50"
  },
  "default": {
    gradient: "from-gray-500 to-slate-500",
    icon: "bg-gray-500",
    text: "text-gray-600",
    bg: "bg-gray-50"
  }
};

// Function to determine category from document class name
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("enrollment") || lowerName.includes("enroll")) return "enrollment";
  if (lowerName.includes("account")) return "accounts";
  if (lowerName.includes("hr") || lowerName.includes("human")) return "hr";
  if (lowerName.includes("finance") || lowerName.includes("financial")) return "finance";
  if (lowerName.includes("legal") || lowerName.includes("law")) return "legal";
  if (lowerName.includes("marketing") || lowerName.includes("market")) return "marketing";
  return "default";
};

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isStatsExpanded, setIsStatsExpanded] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    documentClass: null,
    dateRange: null,
    addedBy: null,
    modifiedBy: null,
    fileType: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isSavedSearchOpen, setIsSavedSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "starred" | "recent" | "shared" | "archive">("home");
  
  // Auto-collapse stats after 5 seconds whenever expanded
  useEffect(() => {
    if (isStatsExpanded) {
      const timer = setTimeout(() => {
        setIsStatsExpanded(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isStatsExpanded]);
  
  type FileKey = 'documentClass' | 'dateAdded' | 'addedBy' | 'dateModified' | 'modifiedBy';
  const [sortConfig, setSortConfig] = useState<{ key: FileKey, direction: 'ascending' | 'descending' } | null>(null);

  const recentActivity = [
    {
      name: "HESCAPRE",
      modified: "Aug 7, 2023",
      thumbnail: exampleImage,
    },
    {
      name: "HESCAPFR-272628...",
      modified: "Oct 4, 2023",
      thumbnail: exampleImage,
    },
    {
      name: "Claim Documents",
      modified: "Nov 18, 2015",
      thumbnail: exampleImage,
    },
    {
      name: "HESCAPRE",
      modified: "Aug 25, 2023",
      thumbnail: exampleImage,
    },
    {
      name: "HESCAPSP-419165...",
      modified: "Oct 4, 2023",
      thumbnail: exampleImage,
    },
  ];

  const allFiles = [
    {
      id: "1",
      documentClass: "24/7 Enrollment",
      dateAdded: "Jan 10, 2018",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 87,
      starred: false,
    },
    {
      id: "2",
      documentClass: "24/7 Enrollment BENELUX",
      dateAdded: "Jan 10, 2018",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 45,
      starred: true,
    },
    {
      id: "3",
      documentClass: "24/7 Enrollment France",
      dateAdded: "Jan 10, 2018",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 62,
      starred: true,
    },
    {
      id: "4",
      documentClass: "24/7 Enrollment Italy",
      dateAdded: "Jan 10, 2018",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 53,
      starred: false,
    },
    {
      id: "5",
      documentClass: "24/7 Enrollment UK",
      dateAdded: "Jan 10, 2018",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 34,
      starred: true,
    },
    {
      id: "6",
      documentClass: "Accounts Payable HEL",
      dateAdded: "Nov 11, 2015",
      addedBy: "ims254",
      dateModified: "Jan 26, 2023",
      modifiedBy: "ims254",
      fileCount: 124,
      starred: false,
    },
  ];

  const starredFiles = allFiles.filter(file => file.starred);

  const recentFiles = [
    {
      id: "r1",
      documentClass: "HESCAPRE Documents",
      dateAdded: "Mar 20, 2023",
      addedBy: "lrcs1f5",
      dateModified: "Mar 22, 2023",
      modifiedBy: "lrcs1f5",
      fileCount: 28,
      starred: false,
    },
    {
      id: "r2",
      documentClass: "Claim Documents 2023",
      dateAdded: "Mar 18, 2023",
      addedBy: "ram_p",
      dateModified: "Mar 21, 2023",
      modifiedBy: "ram_p",
      fileCount: 42,
      starred: true,
    },
    {
      id: "r3",
      documentClass: "HR Policy Updates",
      dateAdded: "Mar 15, 2023",
      addedBy: "ims254",
      dateModified: "Mar 20, 2023",
      modifiedBy: "admin",
      fileCount: 15,
      starred: false,
    },
  ];

  const sharedFiles = [
    {
      id: "s1",
      documentClass: "Finance Reports Q1 2023",
      dateAdded: "Jan 05, 2023",
      addedBy: "finance_team",
      dateModified: "Mar 15, 2023",
      modifiedBy: "cfo",
      fileCount: 156,
      sharedWith: "All Departments",
      starred: false,
    },
    {
      id: "s2",
      documentClass: "Marketing Campaign Assets",
      dateAdded: "Feb 12, 2023",
      addedBy: "marketing",
      dateModified: "Mar 18, 2023",
      modifiedBy: "marketing_lead",
      fileCount: 89,
      sharedWith: "Marketing Team",
      starred: true,
    },
    {
      id: "s3",
      documentClass: "Legal Contracts 2023",
      dateAdded: "Jan 20, 2023",
      addedBy: "legal",
      dateModified: "Mar 10, 2023",
      modifiedBy: "legal_counsel",
      fileCount: 67,
      sharedWith: "Executive Team",
      starred: false,
    },
  ];

  const archivedFiles = [
    {
      id: "a1",
      documentClass: "2022 Annual Reports",
      dateAdded: "Dec 30, 2022",
      addedBy: "admin",
      dateModified: "Jan 05, 2023",
      modifiedBy: "admin",
      fileCount: 234,
      archivedDate: "Jan 05, 2023",
      starred: false,
    },
    {
      id: "a2",
      documentClass: "Old HR Records",
      dateAdded: "Nov 15, 2022",
      addedBy: "hr_admin",
      dateModified: "Dec 20, 2022",
      modifiedBy: "hr_admin",
      fileCount: 412,
      archivedDate: "Dec 31, 2022",
      starred: false,
    },
    {
      id: "a3",
      documentClass: "Legacy Project Files",
      dateAdded: "Oct 10, 2022",
      addedBy: "project_manager",
      dateModified: "Nov 25, 2022",
      modifiedBy: "admin",
      fileCount: 189,
      archivedDate: "Dec 15, 2022",
      starred: true,
    },
  ];

  // Generate sample files for a document class
  const generateSampleFiles = (documentClass: string, count: number) => {
    const fileTypes = ["image/tiff", "application/pdf", "pdf"];
    const files = [];
    
    for (let i = 0; i < count; i++) {
      const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
      files.push({
        id: `file-${i}`,
        name: documentClass,
        fileType: fileType,
        modifiedBy: "lrcs1f5",
        supplierVendorInvoice: Math.random() > 0.3 ? `${900000 + Math.floor(Math.random() * 100000)}` : "N/A",
        supplierVendorNumber: Math.random() > 0.3 ? `${320000 + Math.floor(Math.random() * 80000)}` : "N/A",
        starred: Math.random() > 0.7,
      });
    }
    return files;
  };

  const getFilesForDocumentClass = (documentClass: string) => {
    const docClass = allFiles.find(f => f.documentClass === documentClass);
    if (docClass) {
      return generateSampleFiles(documentClass, docClass.fileCount);
    }
    return [];
  };

  const handleDocumentClassClick = (documentClass: string) => {
    setSelectedClass(documentClass);
    setSelectedFiles(new Set());
  };

  const handleBackToAllFiles = () => {
    setSelectedClass(null);
    setCurrentPage(1);
    setSelectedFiles(new Set());
  };

  const quickAccess = [
    { name: "Human Resources", count: 145, color: "from-blue-500 to-cyan-500" },
    { name: "Finance", count: 289, color: "from-emerald-500 to-teal-500" },
    { name: "Legal", count: 67, color: "from-violet-500 to-purple-500" },
    { name: "Marketing", count: 421, color: "from-orange-500 to-amber-500" },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(new Set(allFiles.map((file) => Number(file.id))));
    } else {
      setSelectedFiles(new Set());
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean) => {
    const id = Number(fileId);
    if (checked) {
      setSelectedFiles(new Set([...selectedFiles, id]));
    } else {
      setSelectedFiles(new Set([...selectedFiles].filter((id) => id !== id)));
    }
  };

  const handleDownload = () => {
    // Implement download logic here
    console.log("Downloading files:", selectedFiles);
    alert(`Downloading ${selectedFiles.size} file(s)`);
  };

  const handleClearSelection = () => {
    setSelectedFiles(new Set());
  };

  // Handle navigation view change
  const handleViewChange = (view: "home" | "starred" | "recent" | "shared" | "archive") => {
    setActiveView(view);
    setSelectedClass(null); // Clear any drill-down view
    setCurrentPage(1); // Reset to first page
    setSelectedFiles(new Set()); // Clear selections
  };

  // Compute search suggestions based on query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length === 0) return [];
    
    const query = searchQuery.toLowerCase();
    return allFiles
      .map(file => file.documentClass)
      .filter(docClass => docClass.toLowerCase().includes(query))
      .slice(0, 8); // Limit to 8 suggestions
  }, [searchQuery, allFiles]);

  const requestSort = (key: FileKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get files based on active view
  const getActiveViewData = () => {
    switch (activeView) {
      case "starred":
        return { files: starredFiles, title: "Starred Documents", description: "Your favorite starred documents" };
      case "recent":
        return { files: recentFiles, title: "Recent Documents", description: "Recently accessed documents" };
      case "shared":
        return { files: sharedFiles, title: "Shared Documents", description: "Documents shared with you and others" };
      case "archive":
        return { files: archivedFiles, title: "Archived Documents", description: "Documents moved to archive" };
      default:
        return { files: allFiles, title: "Document Repository", description: "Browse all your archived documents and files" };
    }
  };

  const currentViewData = getActiveViewData();
  const displayFiles = useMemo(() => {
    let sortableFiles = [...currentViewData.files];
    if (sortConfig !== null) {
      sortableFiles.sort((a, b) => {
        const aValue = String(a[sortConfig.key]);
        const bValue = String(b[sortConfig.key]);
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableFiles;
  }, [currentViewData.files, sortConfig]);

  const isAllSelected = selectedFiles.size === allFiles.length && allFiles.length > 0;
  const isSomeSelected = selectedFiles.size > 0 && selectedFiles.size < allFiles.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100'
    }`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen border-r-2 flex flex-col transition-all duration-300 shadow-xl ${
          isSidebarCollapsed ? "w-20" : "w-72"
        } ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}
      >
        {/* Logo & Toggle */}
        <div className={`p-6 border-b-2 relative ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          {!isSidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <ArkiveLogo className="w-16 h-16 flex-shrink-0" />
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ARKIVE
                </h1>
                <p className="text-xs text-amber-600 font-semibold leading-tight">
                  Store Smart. Find Fast
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <ArkiveLogo className="w-14 h-14" />
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 border-2 border-amber-400 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          style={{
            left: isSidebarCollapsed ? "calc(5rem - 20px)" : "calc(18rem - 20px)",
          }}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-12 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold hover:from-amber-600 hover:to-yellow-600 shadow-md`}
            onClick={() => handleViewChange("home")}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Home</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-11 font-semibold ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange("starred")}
          >
            <Star className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Starred</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-11 font-semibold ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange("recent")}
          >
            <Clock className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Recent</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-11 font-semibold ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange("shared")}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Shared</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-11 font-semibold ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => handleViewChange("archive")}
          >
            <Archive className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Archive</span>}
          </Button>

          {!isSidebarCollapsed && (
            <>
              <Separator className={`my-6 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`} />

              <div className="px-4 py-3">
                <p className="text-xs font-black text-amber-600 uppercase tracking-widest">
                  Quick Access
                </p>
              </div>

              {quickAccess.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-10 group font-semibold ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`} />
                  <span className="flex-1 text-left truncate text-sm">{item.name}</span>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs font-bold border border-amber-300">
                    {item.count}
                  </Badge>
                </Button>
              ))}
            </>
          )}
        </nav>

        {/* Settings */}
        <div className={`p-4 border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <Button
            variant="ghost"
            className={`w-full ${
              isSidebarCollapsed ? "justify-center px-0" : "justify-start gap-4"
            } h-11 font-semibold ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm">Settings</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-72"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b-4 border-amber-500 shadow-lg">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 flex-1 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search documents, folders, or tags..."
                    className="pl-12 h-11 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-500 font-medium rounded-lg"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSearchSuggestions(e.target.value.length > 0);
                    }}
                  />
                  {showSearchSuggestions && (
                    <SearchSuggestions
                      suggestions={searchSuggestions}
                      searchQuery={searchQuery}
                      isVisible={showSearchSuggestions}
                      onSelect={(suggestion) => {
                        setSearchQuery(suggestion);
                        setShowSearchSuggestions(false);
                        handleDocumentClassClick(suggestion);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-11 px-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-lg"
                  onClick={() => setIsSavedSearchOpen(true)}
                >
                  <Bookmark className="w-4 h-4" />
                  Saved Searches
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 h-11 px-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold rounded-lg"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  {(filters.documentClass || filters.dateRange || filters.addedBy || filters.modifiedBy || filters.fileType) && (
                    <Badge className="ml-1 bg-amber-500 text-white">
                      {Object.values(filters).filter(Boolean).length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 border-2 border-gray-300 hover:bg-gray-50 rounded-lg transition-all"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-3 hover:bg-gray-50 h-11 px-3 rounded-lg">
                      <Avatar className="w-9 h-9 border-2 border-amber-400">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white text-sm font-black">
                          RP
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-black text-gray-900 leading-tight">Ram P</p>
                        <p className="text-xs text-gray-500 font-bold leading-tight">Admin</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                    <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem className="font-semibold">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem className="font-semibold">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="relative">
            {/* Master Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-3 right-0 w-8 h-8 rounded-full bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600 shadow-lg z-10"
              onClick={() => setIsStatsExpanded(!isStatsExpanded)}
            >
              {isStatsExpanded ? (
                <ChevronsLeft className="w-4 h-4" />
              ) : (
                <ChevronsRight className="w-4 h-4" />
              )}
            </Button>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={FileText}
                value="12,847"
                label="Total Documents"
                trend={{
                  icon: TrendingUp,
                  value: "+12%",
                  color: "text-green-600"
                }}
                bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                borderColor="border-blue-200"
                hoverBorderColor="hover:border-blue-400"
                isExpanded={isStatsExpanded}
              />
              <StatCard
                icon={Database}
                value="847 GB"
                label="Storage Used"
                bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                borderColor="border-purple-200"
                hoverBorderColor="hover:border-purple-400"
                isExpanded={isStatsExpanded}
              />
              <StatCard
                icon={Users}
                value="3,421"
                label="Shared Files"
                trend={{
                  icon: TrendingUp,
                  value: "+8%",
                  color: "text-green-600"
                }}
                bgColor="bg-gradient-to-br from-green-500 to-green-600"
                borderColor="border-green-200"
                hoverBorderColor="hover:border-green-400"
                isExpanded={isStatsExpanded}
              />
              <StatCard
                icon={Clock}
                value="156"
                label="Active Users"
                trend={{
                  icon: TrendingUp,
                  value: "+5%",
                  color: "text-green-600"
                }}
                bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
                borderColor="border-orange-200"
                hoverBorderColor="hover:border-orange-400"
                isExpanded={isStatsExpanded}
              />
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
                <p className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Documents you've accessed recently</p>
              </div>
              <Button variant="ghost" className={`font-bold ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                View All
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-5">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            className="w-9 h-9 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 shadow-lg"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-gray-200">
                          <DropdownMenuItem className="font-semibold">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="font-semibold">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-200" />
                          <DropdownMenuItem className="text-red-600 font-semibold">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="p-4 border-t-2 border-gray-100">
                    <p className="font-bold text-sm truncate text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 font-semibold mt-1">{item.modified}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Files Section */}
          <section>
            {!selectedClass ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{currentViewData.title}</h2>
                    <p className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentViewData.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("list")}
                      className={`h-11 w-11 ${
                        viewMode === "list"
                          ? "text-white bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md"
                          : "text-gray-400 hover:text-gray-900"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setViewMode("grid")}
                      className={`h-11 w-11 ${
                        viewMode === "grid"
                          ? "text-white bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md"
                          : "text-gray-400 hover:text-gray-900"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {viewMode === "list" ? (
                  <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-amber-300 bg-gradient-to-r from-amber-400 to-yellow-400">
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest">
                            <button
                              onClick={() => requestSort('documentClass')}
                              className="flex items-center gap-2 hover:text-gray-700 transition-colors font-black"
                            >
                              <FolderOpen className="w-5 h-5" />
                              Document Class
                              {sortConfig && sortConfig.key === 'documentClass' ? (
                                sortConfig.direction === 'ascending' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </th>
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest">
                            <button
                              onClick={() => requestSort('dateAdded')}
                              className="flex items-center gap-2 hover:text-gray-700 transition-colors font-black"
                            >
                              Date Added
                              {sortConfig && sortConfig.key === 'dateAdded' ? (
                                sortConfig.direction === 'ascending' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </th>
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest">
                            <button
                              onClick={() => requestSort('addedBy')}
                              className="flex items-center gap-2 hover:text-gray-700 transition-colors font-black"
                            >
                              Added By
                              {sortConfig && sortConfig.key === 'addedBy' ? (
                                sortConfig.direction === 'ascending' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </th>
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest">
                            <button
                              onClick={() => requestSort('dateModified')}
                              className="flex items-center gap-2 hover:text-gray-700 transition-colors font-black"
                            >
                              Date Modified
                              {sortConfig && sortConfig.key === 'dateModified' ? (
                                sortConfig.direction === 'ascending' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </th>
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest">
                            <button
                              onClick={() => requestSort('modifiedBy')}
                              className="flex items-center gap-2 hover:text-gray-700 transition-colors font-black"
                            >
                              Modified By
                              {sortConfig && sortConfig.key === 'modifiedBy' ? (
                                sortConfig.direction === 'ascending' ? (
                                  <ArrowUp className="w-4 h-4" />
                                ) : (
                                  <ArrowDown className="w-4 h-4" />
                                )
                              ) : (
                                <ArrowUpDown className="w-4 h-4 opacity-40" />
                              )}
                            </button>
                          </th>
                          <th className="text-left py-4 px-3 text-xs font-black text-gray-900 uppercase tracking-widest"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayFiles
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((file, index) => {
                          const category = getCategoryFromName(file.documentClass);
                          const colors = categoryColors[category];
                          return (
                            <tr
                              key={file.id}
                              className="border-b border-gray-100 hover:bg-amber-50/50 transition-all group cursor-pointer"
                              onClick={() => handleDocumentClassClick(file.documentClass)}
                            >
                              <td className="py-4 px-3">
                                <div className="flex items-center gap-4">
                                  <div className={`w-11 h-11 rounded-xl ${colors.icon} flex items-center justify-center shadow-md`}>
                                    <Folder className="w-6 h-6 text-white" />
                                  </div>
                                  <span className="text-sm font-bold text-gray-900">{file.documentClass}</span>
                                </div>
                              </td>
                              <td className="py-4 px-3 text-sm font-semibold text-gray-600">{file.dateAdded}</td>
                              <td className="py-4 px-3 text-sm font-semibold text-gray-600">{file.addedBy}</td>
                              <td className="py-4 px-3 text-sm font-semibold text-gray-600">{file.dateModified}</td>
                              <td className="py-4 px-3 text-sm font-semibold text-gray-600">{file.modifiedBy}</td>
                              <td className="py-4 px-3">
                                <div className="flex items-center justify-end">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-9 h-9 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-lg"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-white border-gray-200">
                                      <DropdownMenuItem className="font-semibold">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="font-semibold">
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-gray-200" />
                                      <DropdownMenuItem className="text-red-600 font-semibold">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    
                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between px-6 py-4 border-t-2 border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-700">Items per page:</span>
                        <Select
                          value={itemsPerPage.toString()}
                          onValueChange={(value) => {
                            setItemsPerPage(Number(value));
                            setCurrentPage(1);
                          }}
                        >
                          <SelectTrigger className="w-24 h-10 bg-white border-2 border-gray-300 font-bold">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="10" className="font-semibold">10</SelectItem>
                            <SelectItem value="25" className="font-semibold">25</SelectItem>
                            <SelectItem value="50" className="font-semibold">50</SelectItem>
                            <SelectItem value="75" className="font-semibold">75</SelectItem>
                            <SelectItem value="100" className="font-semibold">100</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold text-gray-700">
                          Page {currentPage} of {Math.ceil(currentViewData.files.length / itemsPerPage)}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
                            onClick={() => setCurrentPage(Math.min(Math.ceil(currentViewData.files.length / itemsPerPage), currentPage + 1))}
                            disabled={currentPage === Math.ceil(currentViewData.files.length / itemsPerPage)}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-6">
                    {displayFiles.map((file) => {
                      const category = getCategoryFromName(file.documentClass);
                      const colors = categoryColors[category];
                      return (
                        <div
                          key={file.id}
                          className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer"
                          onClick={() => handleDocumentClassClick(file.documentClass)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg`}>
                              <Folder className="w-7 h-7 text-white" />
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-9 h-9 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-gray-200">
                                <DropdownMenuItem className="font-semibold">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-semibold">
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-200" />
                                <DropdownMenuItem className="text-red-600 font-semibold">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="font-bold text-sm text-gray-900 mb-3">{file.documentClass}</p>
                          <div className="space-y-1.5 text-xs text-gray-600">
                            <p className="font-semibold">Modified: {file.dateModified}</p>
                            <p className="font-semibold">By: {file.modifiedBy}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <DocumentDetailView
                documentClass={selectedClass}
                files={getFilesForDocumentClass(selectedClass)}
                onBack={handleBackToAllFiles}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                selectedFiles={selectedFiles}
                onSelectFile={handleSelectFile}
                onSelectAll={(checked) => {
                  const files = getFilesForDocumentClass(selectedClass);
                  if (checked) {
                    setSelectedFiles(new Set(files.map(f => Number(f.id))));
                  } else {
                    setSelectedFiles(new Set());
                  }
                }}
              />
            )}
          </section>
        </main>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        documentClasses={allFiles.map(f => f.documentClass)}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Saved Search Panel */}
      <SavedSearchPanel
        isOpen={isSavedSearchOpen}
        onClose={() => setIsSavedSearchOpen(false)}
        onSelectSearch={(search) => {
          if (search.filters.documentClass) {
            setFilters({
              documentClass: search.filters.documentClass,
              dateRange: search.filters.dateRange || null,
              addedBy: search.filters.addedBy || null,
              modifiedBy: search.filters.modifiedBy || null,
              fileType: search.filters.fileType || null,
            });
          }
          if (search.filters.searchQuery) {
            setSearchQuery(search.filters.searchQuery);
          }
          setIsSavedSearchOpen(false);
        }}
        currentFilters={filters}
        currentSearchQuery={searchQuery}
      />
    </div>
  );
}