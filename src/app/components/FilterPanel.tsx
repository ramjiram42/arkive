import { useState } from "react";
import { Button } from "./ui/button";
import { X, FileText, Settings, ChevronDown, ChevronUp, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  documentClasses: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  documentClass: string | null;
  dateRange: string | null;
  addedBy: string | null;
  modifiedBy: string | null;
  fileType: string | null;
}

export function FilterPanel({
  isOpen,
  onClose,
  documentClasses,
  onFilterChange,
}: FilterPanelProps) {
  const [documentExpanded, setDocumentExpanded] = useState(true);
  const [propertiesExpanded, setPropertiesExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    documentClass: null,
    dateRange: null,
    addedBy: null,
    modifiedBy: null,
    fileType: null,
  });
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDocumentSelect = (docClass: string) => {
    setDocumentSearchQuery(docClass);
    handleFilterChange("documentClass", docClass);
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      documentClass: null,
      dateRange: null,
      addedBy: null,
      modifiedBy: null,
      fileType: null,
    };
    setFilters(clearedFilters);
    setDocumentSearchQuery("");
    onFilterChange(clearedFilters);
  };

  const filteredDocumentClasses = documentClasses.filter((docClass) =>
    docClass.toLowerCase().includes(documentSearchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end" onClick={onClose}>
      <div className="bg-white w-96 h-full shadow-2xl animate-in slide-in-from-right relative" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black text-gray-900">Filter By</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 w-9 h-9"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters Content */}
        <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-160px)]">
          {/* Document Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setDocumentExpanded(!documentExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-gray-900">Document</span>
              </div>
              {documentExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {documentExpanded && (
              <div className="px-4 pb-4 pt-2 relative">
                <Input
                  type="text"
                  placeholder="Search documents..."
                  value={documentSearchQuery}
                  onChange={(e) => {
                    setDocumentSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:bg-gray-50 font-semibold"
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && documentSearchQuery && filteredDocumentClasses.length > 0 && (
                  <div className="absolute left-4 right-4 top-[calc(100%-1rem)] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 mt-1">
                    {filteredDocumentClasses.map((docClass) => (
                      <button
                        key={docClass}
                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2"
                        onClick={() => handleDocumentSelect(docClass)}
                      >
                        <FileText className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>{docClass}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* No results message */}
                {showSuggestions && documentSearchQuery && filteredDocumentClasses.length === 0 && (
                  <div className="absolute left-4 right-4 top-[calc(100%-1rem)] bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1 px-4 py-3">
                    <p className="text-sm text-gray-500 font-semibold">No matching documents found</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Document Properties Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setPropertiesExpanded(!propertiesExpanded)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-gray-900">
                  Document Properties
                </span>
              </div>
              {propertiesExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </button>

            {propertiesExpanded && (
              <div className="px-4 pb-4 pt-2 space-y-4">
                {/* Date Range Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                    Date Range
                  </label>
                  <Select
                    value={filters.dateRange || ""}
                    onValueChange={(value) =>
                      handleFilterChange("dateRange", value || null)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold">
                      <SelectValue placeholder="Select Date Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem
                        value="today"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        Today
                      </SelectItem>
                      <SelectItem
                        value="week"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        Last 7 Days
                      </SelectItem>
                      <SelectItem
                        value="month"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        Last 30 Days
                      </SelectItem>
                      <SelectItem
                        value="quarter"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        Last 90 Days
                      </SelectItem>
                      <SelectItem
                        value="year"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        Last Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Added By Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                    Added By
                  </label>
                  <Select
                    value={filters.addedBy || ""}
                    onValueChange={(value) =>
                      handleFilterChange("addedBy", value || null)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold">
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem
                        value="ims254"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        ims254
                      </SelectItem>
                      <SelectItem
                        value="lrcs1f5"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        lrcs1f5
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Modified By Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                    Modified By
                  </label>
                  <Select
                    value={filters.modifiedBy || ""}
                    onValueChange={(value) =>
                      handleFilterChange("modifiedBy", value || null)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold">
                      <SelectValue placeholder="Select User" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem
                        value="ims254"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        ims254
                      </SelectItem>
                      <SelectItem
                        value="lrcs1f5"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        lrcs1f5
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* File Type Filter */}
                <div>
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
                    File Type
                  </label>
                  <Select
                    value={filters.fileType || ""}
                    onValueChange={(value) =>
                      handleFilterChange("fileType", value || null)
                    }
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold">
                      <SelectValue placeholder="Select File Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem
                        value="pdf"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        PDF
                      </SelectItem>
                      <SelectItem
                        value="tiff"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        TIFF
                      </SelectItem>
                      <SelectItem
                        value="all"
                        className="text-gray-900 hover:bg-gray-100 font-semibold"
                      >
                        All Documents
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200 bg-white flex gap-3">
          <Button
            onClick={clearFilters}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 font-bold"
          >
            Clear All
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-bold shadow-lg"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}