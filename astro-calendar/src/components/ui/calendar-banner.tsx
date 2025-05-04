import { useState } from 'react';
import { DayCard } from './day-card';

interface CalendarBannerProps {
  initialSelectedIndex?: number;
  days?: { day: string; date: string }[];
}

export function CalendarBanner({ 
  initialSelectedIndex = 1, 
  days = [
    { day: 'Sunday', date: '16' },
    { day: 'Monday', date: '17' },
    { day: 'Tuesday', date: '18' },
    { day: 'Wednesday', date: '19' },
    { day: 'Thursday', date: '20' },
    { day: 'Friday', date: '21' },
    { day: 'Saturday', date: '22' }
  ] 
}: CalendarBannerProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  return (
    <div className="flex flex-row gap-2">
      {days.map((day, index) => (
        <DayCard
          key={index}
          day={day.day}
          date={day.date}
          isSelected={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
} 