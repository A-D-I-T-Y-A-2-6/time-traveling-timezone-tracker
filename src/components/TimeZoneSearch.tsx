
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { timeZoneData } from "@/lib/timeZoneData";

interface TimeZoneSearchProps {
  onSelectTimeZone: (timeZone: string, locationName: string) => void;
}

const TimeZoneSearch: React.FC<TimeZoneSearchProps> = ({ onSelectTimeZone }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ zone: string; name: string }>>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    const filteredResults = timeZoneData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.zone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  const handleSelect = (zone: string, name: string) => {
    onSelectTimeZone(zone, name);
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <div className="flex gap-2">
        <Input
          placeholder="Search for a country, city or time zone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSelect(result.zone, result.name)}
              >
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-muted-foreground">{result.zone}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showResults && searchResults.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 p-4 text-center">
          No time zones found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default TimeZoneSearch;
