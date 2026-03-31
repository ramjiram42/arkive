import { FileText, File, Image, FileSpreadsheet, File as FileIcon, MoreVertical, Download, Share2, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface DocumentCardProps {
  name: string;
  type: string;
  size: string;
  modified: string;
  category?: string;
}

export function DocumentCard({ name, type, size, modified, category }: DocumentCardProps) {
  const getIcon = () => {
    const iconClass = "w-10 h-10";
    switch (type) {
      case "pdf":
        return <FileText className={`${iconClass} text-red-500`} />;
      case "doc":
      case "docx":
        return <FileText className={`${iconClass} text-blue-500`} />;
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className={`${iconClass} text-green-500`} />;
      case "png":
      case "jpg":
      case "jpeg":
        return <Image className={`${iconClass} text-purple-500`} />;
      default:
        return <FileIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{name}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <span>{size}</span>
                <span>•</span>
                <span>{modified}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {category && (
            <Badge variant="secondary" className="mt-2">
              {category}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
