import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { useState } from 'react';

export function ReactToggleGroup() {
  const [value, setValue] = useState("week");

  return (
    <div className="flex flex-row gap-2 bg-gray-100 rounded-xl p-2">
        <ToggleGroup 
          type="single" 
          value={value} 
          onValueChange={(val) => val && setValue(val)}
        >
            <ToggleGroupItem value="month" aria-label="Toggle month" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-l-md px-4 py-2 font-medium">
                <div className={`${value === "month" ? "font-bold" : "font-normal"} text-base px-4`}>Month</div>
            </ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="Toggle week" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 px-4 py-2 font-medium">
                <div className={`${value === "week" ? "font-bold" : "font-normal"} text-base px-4`}>Week</div>
            </ToggleGroupItem>
            <ToggleGroupItem value="day" aria-label="Toggle day" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-r-md px-4 py-2 font-medium">
                <div className={`${value === "day" ? "font-bold" : "font-normal"} text-base px-4`}>Day</div>
            </ToggleGroupItem>
        </ToggleGroup>
    </div>
  );
} 