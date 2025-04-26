import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VariableSearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/**
 * Component for searching variables
 */
export function VariableSearchInput({ 
  searchTerm, 
  onSearchChange 
}: VariableSearchInputProps) {
  return (
    <div className="relative items-center gap-x-2 mb-4">
      <Search className="absolute left-1.5 top-2.5  h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search variables..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-6 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="variable-search-input"
      />
    </div>
  );
}