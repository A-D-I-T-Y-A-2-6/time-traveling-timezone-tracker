
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimeZoneDisplayProps {
  timeZone: string;
  locationName: string;
  className?: string;
  size?: "default" | "large";
}

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({
  timeZone,
  locationName,
  className = "",
  size = "default",
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

  const timeTextSize = size === "large" ? "text-6xl" : "text-4xl";
  const cardSize = size === "large" ? "min-w-[400px]" : "min-w-[300px]";
  const locationSize = size === "large" ? "text-2xl" : "text-xl";

  return (
    <Card className={`${cardSize} ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`${locationSize} font-bold`}>{locationName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${timeTextSize} font-bold mb-2`}>{formattedTime}</div>
        <div className="text-muted-foreground">{formattedDate}</div>
        <div className="text-sm text-muted-foreground mt-2">{timeZone}</div>
      </CardContent>
    </Card>
  );
};

export default TimeZoneDisplay;
