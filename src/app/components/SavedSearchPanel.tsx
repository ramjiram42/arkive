import { useState } from "react";
import { Button } from "./ui/button";
import { X, Bookmark, Plus, Trash2, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    documentClass?: string;
    dateRange?: string;
    addedBy?: string;
    modifiedBy?: string;
    fileType?: string;
    searchQuery?: string;
  };
}

interface SavedSearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSearch: (search: SavedSearch) => void;
  currentFilters: any;
  currentSearchQuery: string;
}

export function SavedSearchPanel({
  isOpen,
  onClose,
  onSelectSearch,
  currentFilters,
  currentSearchQuery,
}: SavedSearchPanelProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: "1",
      name: "Invoice_Search",
      filters: {
        documentClass: "Accounts Payable",
        searchQuery: "INVOICE",
      },
    },
    {
      id: "2",
      name: "HR_Documents_2024",
      filters: {
        documentClass: "24/7 Enrollment",
        dateRange: "year",
        addedBy: "ims254",
      },
    },
    {
      id: "3",
      name: "Recent_Finance_Docs",
      filters: {
        documentClass: "Finance",
        dateRange: "month",
        fileType: "pdf",
      },
    },
  ]);

  const [selectedSearchId, setSelectedSearchId] = useState<string>("");
  const [showNewSearchInput, setShowNewSearchInput] = useState(false);
  const [newSearchName, setNewSearchName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelectSearch = (search: SavedSearch) => {
    setSelectedSearchId(search.id);
    setSearchQuery(search.name);
    onSelectSearch(search);
    setShowSuggestions(false);
  };

  const handleSaveCurrentSearch = () => {
    if (newSearchName.trim()) {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name: newSearchName,
        filters: {
          ...currentFilters,
          searchQuery: currentSearchQuery,
        },
      };
      setSavedSearches([...savedSearches, newSearch]);
      setNewSearchName("");
      setShowNewSearchInput(false);
    }
  };

  const handleDeleteSearch = (searchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedSearches(savedSearches.filter((s) => s.id !== searchId));
    if (selectedSearchId === searchId) {
      setSelectedSearchId("");
      setSearchQuery("");
    }
  };

  const filteredSavedSearches = savedSearches.filter((search) =>
    search.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-[500px] rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-black text-gray-900">Saved Searches</h2>
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Select Saved Search */}
          <div className="relative">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 block">
              Select a Saved Search
            </label>
            <Input
              type="text"
              placeholder="Choose a saved search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:bg-gray-50 font-semibold h-12"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && filteredSavedSearches.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.25rem)] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                {filteredSavedSearches.map((search) => (
                  <button
                    key={search.id}
                    className="w-full px-4 py-3 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-3"
                    onClick={() => handleSelectSearch(search)}
                  >
                    <Bookmark className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-gray-900 font-bold">{search.name}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {Object.values(search.filters).filter(Boolean).length} filter(s) applied
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* No results message */}
            {showSuggestions && searchQuery && filteredSavedSearches.length === 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.25rem)] bg-white border border-gray-300 rounded-md shadow-lg z-10 px-4 py-3">
                <p className="text-sm text-gray-600 font-semibold">No matching saved searches found</p>
              </div>
            )}
          </div>

          {/* Saved Searches List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedSearches.map((search) => (
              <div
                key={search.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedSearchId === search.id
                    ? "bg-amber-500/10 border-amber-500"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleSelectSearch(search)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Bookmark
                    className={`w-5 h-5 ${
                      selectedSearchId === search.id
                        ? "text-amber-500"
                        : "text-gray-600"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{search.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {Object.values(search.filters).filter(Boolean).length}{" "}
                      filter(s) applied
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDeleteSearch(search.id, e)}
                  className="w-8 h-8 text-gray-600 hover:text-red-500 hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Save Current Search */}
          <div className="pt-4 border-t border-gray-200">
            {!showNewSearchInput ? (
              <Button
                onClick={() => setShowNewSearchInput(true)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-300 font-bold h-11"
              >
                <Plus className="w-4 h-4 mr-2" />
                Save Current Search
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  placeholder="Enter search name..."
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 font-semibold"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSaveCurrentSearch();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveCurrentSearch}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-bold"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewSearchInput(false);
                      setNewSearchName("");
                    }}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 font-bold"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 font-bold shadow-lg h-11"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}