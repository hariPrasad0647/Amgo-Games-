import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onSearch,
  placeholder = "Search campaigns..."
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  // Sync when URL changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(internalValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [internalValue]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        className="h-9 w-72 rounded-md border border-input bg-card pl-9 pr-3 text-sm"
      />
    </div>
  );
}