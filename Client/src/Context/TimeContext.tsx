import React, { createContext, useEffect, useState } from "react";
export const TimeContext = createContext("");

export function TimeProvider({ children }: any) {
  const [time, setTime] = useState(new Date());
  const locale: string = "en";
  const day: string = time.toLocaleDateString(locale, { weekday: "long" });
  const date: string = `${day}, ${time.getDate()} ${time.toLocaleDateString(
    locale, { month: "long" }
  )}`;
  const hour: number = time.getHours();
  const wish: string = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }. `;

  const displayTime: string = time.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: `2-digit`,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <TimeContext.Provider value={`${wish}Time: ${displayTime} ${date}`}>
      {children}
    </TimeContext.Provider>
  );
}
