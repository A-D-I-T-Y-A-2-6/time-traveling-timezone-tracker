
import React, { useState, useEffect } from "react";
import TimeZoneDisplay from "@/components/TimeZoneDisplay";
import TimeZoneSearch from "@/components/TimeZoneSearch";

const Index = () => {
  const [indiaTimeZone] = useState({
    timeZone: "Asia/Kolkata",
    locationName: "India"
  });

  const [selectedTimeZone, setSelectedTimeZone] = useState<{
    timeZone: string;
    locationName: string;
  } | null>(null);

  const handleSelectTimeZone = (timeZone: string, locationName: string) => {
    setSelectedTimeZone({ timeZone, locationName });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Time-Traveling Timezone Tracker</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            Track and compare time zones around the world in real-time.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {selectedTimeZone ? (
            <>
              <TimeZoneDisplay
                timeZone={indiaTimeZone.timeZone}
                locationName={indiaTimeZone.locationName}
                className="transform transition-all"
                size="large"
              />
              <TimeZoneDisplay
                timeZone={selectedTimeZone.timeZone}
                locationName={selectedTimeZone.locationName}
                className="transform transition-all"
              />
            </>
          ) : (
            <TimeZoneDisplay
              timeZone={indiaTimeZone.timeZone}
              locationName={indiaTimeZone.locationName}
              className="transform transition-all"
              size="large"
            />
          )}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Search Time Zones</h2>
            <TimeZoneSearch onSelectTimeZone={handleSelectTimeZone} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2025 Time-Traveling Timezone Tracker
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
