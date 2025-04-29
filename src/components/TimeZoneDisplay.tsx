
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimeZoneDisplayProps {
  timeZone: string;
  locationName: string;
  className?: string;
}

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({
  timeZone,
  locationName,
  className = "",
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = formatInTimeZone(
    currentTime,
    timeZone,
    "HH:mm:ss"
  );

  const formattedDate = formatInTimeZone(
    currentTime,
    timeZone,
    "EEE, MMM dd, yyyy"
  );

  return (
    <Card className={`min-w-[300px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{locationName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-2">{formattedTime}</div>
        <div className="text-muted-foreground">{formattedDate}</div>
        <div className="text-sm text-muted-foreground mt-2">{timeZone}</div>
      </CardContent>
    </Card>
  );
};

export default TimeZoneDisplay;
