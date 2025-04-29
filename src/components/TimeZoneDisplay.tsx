
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TimeZoneDisplayProps {
  timeZone: string;
  locationName: string;
  className?: string;
  size?: "default" | "large";
  referenceTimeZone?: string;
}

const TimeZoneDisplay: React.FC<TimeZoneDisplayProps> = ({
  timeZone,
  locationName,
  className = "",
  size = "default",
  referenceTimeZone,
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

  // Calculate time difference if reference timezone is provided
  let timeDifferenceText = "";
  if (referenceTimeZone) {
    // Get hours in both timezones
    const currentHour = parseInt(formatInTimeZone(currentTime, timeZone, "H"));
    const referenceHour = parseInt(formatInTimeZone(currentTime, referenceTimeZone, "H"));
    
    // Calculate difference (can be negative)
    let hourDifference = currentHour - referenceHour;
    
    // Handle day boundary cases
    if (hourDifference > 12) hourDifference -= 24;
    if (hourDifference < -12) hourDifference += 24;
    
    const sign = hourDifference >= 0 ? "+" : "";
    
    // Customize message based on the location name
    if (locationName === "India") {
      timeDifferenceText = `${sign}${hourDifference} hours from selected country`;
    } else {
      timeDifferenceText = `${sign}${hourDifference} hours from India`;
    }
  }

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
        {timeDifferenceText && (
          <div className="text-sm font-medium text-blue-500 mt-2">
            {timeDifferenceText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeZoneDisplay;
