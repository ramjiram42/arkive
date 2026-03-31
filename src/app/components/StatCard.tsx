import { useState, useEffect } from "react";
import { LucideIcon, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Button } from "./ui/button";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: {
    icon: LucideIcon;
    value: string;
    color: string;
  };
  bgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  isExpanded?: boolean;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  bgColor,
  borderColor,
  hoverBorderColor,
  isExpanded = true,
}: StatCardProps) {
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLabels(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-white rounded-xl border ${borderColor} ${hoverBorderColor} hover:shadow-xl transition-all relative group ${
        isExpanded ? "p-4" : "p-2"
      }`}
    >
      <div className={`flex ${isExpanded ? "items-start justify-between mb-3" : "flex-col items-center justify-center gap-1"}`}>
        <div className={`rounded-lg ${bgColor} flex items-center justify-center shadow-md ${isExpanded ? "w-10 h-10" : "w-7 h-7"}`}>
          <Icon className={`text-white ${isExpanded ? "w-5 h-5" : "w-3.5 h-3.5"}`} />
        </div>
        
        {trend && isExpanded && (
          <div className={`flex items-center gap-1 ${trend.color} bg-opacity-10 px-2 py-0.5 rounded-full`}>
            <trend.icon className="w-3 h-3" />
            <span className="text-[10px] font-black">{trend.value}</span>
          </div>
        )}
      </div>

      <div className={isExpanded ? "" : "text-center"}>
        <p className={`font-black text-gray-900 ${isExpanded ? "text-2xl mb-0.5" : "text-sm"}`}>
          {value}
        </p>
        {(showLabels || isExpanded) && (
          <p className={`text-gray-600 font-bold uppercase tracking-wide ${isExpanded ? "text-[10px]" : "text-[8px]"}`}>
            {label}
          </p>
        )}
      </div>
    </div>
  );
}