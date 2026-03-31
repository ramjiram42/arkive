import { Folder, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

interface FolderCardProps {
  name: string;
  itemCount: number;
  color?: string;
}

export function FolderCard({ name, itemCount, color = "blue" }: FolderCardProps) {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    purple: "text-purple-500 bg-purple-50",
    orange: "text-orange-500 bg-orange-50",
    pink: "text-pink-500 bg-pink-50",
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Folder className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-sm text-gray-500">{itemCount} items</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Card>
  );
}
