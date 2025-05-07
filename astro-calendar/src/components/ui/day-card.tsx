import React from 'react';

interface DayCardProps {
  day: string;
  date: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function DayCard({ day, date, isSelected = false, onClick }: DayCardProps) {

  return (
    <div
      className={`h-[5vw] min-h-[75px] w-[10vw] min-w-[150px] rounded-xl transition-colors duration-300 ${isSelected ? 'bg-zinc-900' : 'bg-gray-100'} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className={`text-base font-normal ${isSelected ? 'text-white' : 'text-black'}`}>
          {day}
        </div>
        <div className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
          {date}
        </div>
      </div>
    </div>
  );
} 