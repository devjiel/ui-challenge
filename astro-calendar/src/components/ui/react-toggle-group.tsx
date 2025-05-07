import * as React from 'react';
import { PeriodToggleGroup, PeriodToggleGroupItem } from './PeriodToggleGroup';
import { currentCalendarView, setCalendarView, type CalendarView } from '../../stores/calendarViewStore';
import { setCalendarDate } from '../../stores/calendarDateStore';

interface ReactToggleGroupProps { }

export function ReactToggleGroup({ }: ReactToggleGroupProps) {
  const [localView, setLocalView] = React.useState<CalendarView>(currentCalendarView.get());

  React.useEffect(() => {
    const unsubscribe = currentCalendarView.subscribe((newView) => {
      setLocalView(newView);
    });

    return () => unsubscribe();
  }, []);

  const handleValueChange = (val: string) => {
    if (val) {
      if (val === 'day' || val === 'week' || val === 'month') {
        setCalendarView(val as CalendarView);
        setCalendarDate(new Date());
      } else {
        console.warn(`ReactToggleGroup received an unexpected value: ${val}`);
      }
    }
  };

  return (
    <div className="flex flex-row gap-2 bg-gray-100 rounded-xl p-2">
      <PeriodToggleGroup
        type="single"
        value={localView}
        onValueChange={handleValueChange}
      >
        <PeriodToggleGroupItem value="month" aria-label="Toggle month" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-l-md px-4 py-2 font-medium">
          <div className={`${localView === "month" ? "font-bold" : "font-normal"} text-base px-4`}>Month</div>
        </PeriodToggleGroupItem>
        <PeriodToggleGroupItem value="week" aria-label="Toggle week" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 px-4 py-2 font-medium">
          <div className={`${localView === "week" ? "font-bold" : "font-normal"} text-base px-4`}>Week</div>
        </PeriodToggleGroupItem>
        <PeriodToggleGroupItem value="day" aria-label="Toggle day" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-r-md px-4 py-2 font-medium">
          <div className={`${localView === "day" ? "font-bold" : "font-normal"} text-base px-4`}>Day</div>
        </PeriodToggleGroupItem>
      </PeriodToggleGroup>
    </div>
  );
} 