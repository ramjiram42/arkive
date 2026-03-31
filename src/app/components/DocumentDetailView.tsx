import {
  ChevronRight,
  ChevronLeft,
  Download,
  Share2,
  Trash2,
  Star,
  FileText,
  FileImage,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useState, useMemo } from "react";

interface FileDetail {
  id: string;
  name: string;
  fileType: string;
  modifiedBy: string;
  supplierVendorInvoice: string;
  supplierVendorNumber: string;
  starred: boolean;
}

interface DocumentDetailViewProps {
  documentClass: string;
  files: FileDetail[];
  onBack: () => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  selectedFiles: Set<number>;
  onSelectFile: (fileId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export function DocumentDetailView({
  documentClass,
  files,
  onBack,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  selectedFiles,
  onSelectFile,
  onSelectAll,
}: DocumentDetailViewProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof FileDetail, direction: 'ascending' | 'descending' } | null>(null);

  const sortedFiles = useMemo(() => {
    let sortableFiles = [...files];
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
  }, [files, sortConfig]);

  const requestSort = (key: keyof FileDetail) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedFiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedFiles.length);
  const paginatedFiles = sortedFiles.slice(startIndex, endIndex);
  const isAllSelected = paginatedFiles.length > 0 && paginatedFiles.every((file) => selectedFiles.has(parseInt(file.id)));

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image") || fileType.includes("tiff")) {
      return <FileImage className="w-5 h-5 text-white" />;
    }
    return <FileText className="w-5 h-5 text-white" />;
  };

  const getFileIconBg = (fileType: string) => {
    if (fileType.includes("image") || fileType.includes("tiff")) {
      return "bg-gradient-to-br from-purple-500 to-purple-600";
    }
    return "bg-gradient-to-br from-red-500 to-red-600";
  };

  const handleDownload = () => {
    console.log("Downloading files:", selectedFiles);
    alert(`Downloading ${selectedFiles.size} file(s)`);
  };

  const handleClearSelection = () => {
    onSelectAll(false);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 font-bold transition-colors text-sm uppercase tracking-wide"
        >
          All Files
        </button>
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="text-gray-900 font-black text-lg">{documentClass}</span>
      </div>

      {/* Selection Toolbar */}
      {selectedFiles.size > 0 && (
        <div className="mb-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl p-4 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-black text-lg">{selectedFiles.size} File{selectedFiles.size > 1 ? 's' : ''} Selected</span>
            <Button
              onClick={handleClearSelection}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 font-bold"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Selection
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              className="bg-white text-amber-600 hover:bg-gray-100 font-bold shadow-md"
            >
              <Download className="w-4 h-4 mr-2" />
              {selectedFiles.size === 1 ? 'Download' : 'Download All'}
            </Button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-700">
            Showing {startIndex + 1}-{endIndex} of {files.length} files
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">Items per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-24 h-10 border-2 border-gray-300 font-bold">
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
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
              <th className="text-left py-4 px-6 w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={onSelectAll}
                  aria-label="Select all files"
                  className="border-2"
                />
              </th>
              <th className="text-left py-4 px-6 w-12"></th>
              <th className="text-left py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-widest">
                <button
                  onClick={() => requestSort('name')}
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  Name
                  {sortConfig && sortConfig.key === 'name' ? (
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
              <th className="text-left py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-widest">
                <button
                  onClick={() => requestSort('fileType')}
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  File Type
                  {sortConfig && sortConfig.key === 'fileType' ? (
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
              <th className="text-left py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-widest">
                <button
                  onClick={() => requestSort('modifiedBy')}
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
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
              <th className="text-left py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-widest">
                <button
                  onClick={() => requestSort('supplierVendorInvoice')}
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  Supplier/Vendor Invoice
                  {sortConfig && sortConfig.key === 'supplierVendorInvoice' ? (
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
              <th className="text-left py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-widest">
                <button
                  onClick={() => requestSort('supplierVendorNumber')}
                  className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                >
                  Supplier/Vendor Number
                  {sortConfig && sortConfig.key === 'supplierVendorNumber' ? (
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
              <th className="text-left py-4 px-6 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map((file) => (
              <tr
                key={file.id}
                className={`border-b border-gray-100 hover:bg-amber-50/50 transition-all group ${
                  selectedFiles.has(parseInt(file.id)) ? "bg-amber-100/60" : ""
                }`}
              >
                <td className="py-4 px-6">
                  <Checkbox
                    checked={selectedFiles.has(parseInt(file.id))}
                    onCheckedChange={(checked) => onSelectFile(file.id, checked as boolean)}
                    aria-label={`Select ${file.name}`}
                    className="border-2"
                  />
                </td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                    <Star
                      className={`w-5 h-5 ${
                        file.starred ? "fill-yellow-500 text-yellow-500" : ""
                      }`}
                    />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl ${getFileIconBg(file.fileType)} flex items-center justify-center shadow-md`}>
                      {getFileIcon(file.fileType)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{file.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-600">{file.fileType}</td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-600">{file.modifiedBy}</td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-600">{file.supplierVendorInvoice}</td>
                <td className="py-4 px-6 text-sm font-semibold text-gray-600">{file.supplierVendorNumber}</td>
                <td className="py-4 px-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-9 h-9 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-700">
            Showing {startIndex + 1}-{endIndex} of {files.length} files
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-700">Items per page:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-24 h-10 border-2 border-gray-300 font-bold">
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
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-2 border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}