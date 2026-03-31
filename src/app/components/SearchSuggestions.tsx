import { FileText, Folder } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isVisible: boolean;
  searchQuery: string;
}

export function SearchSuggestions({
  suggestions,
  onSelect,
  isVisible,
  searchQuery,
}: SearchSuggestionsProps) {
  if (!isVisible || suggestions.length === 0) return null;

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} className="font-black text-amber-600">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border-2 border-gray-200 shadow-2xl z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="px-3 py-2">
          <p className="text-xs font-black text-gray-500 uppercase tracking-wider">
            Suggestions ({suggestions.length})
          </p>
        </div>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-amber-50 rounded-lg transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-md">
              <Folder className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-gray-900">
                {highlightMatch(suggestion, searchQuery)}
              </p>
            </div>
            <FileText className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
