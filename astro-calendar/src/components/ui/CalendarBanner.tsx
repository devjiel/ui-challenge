import { useEffect, useState } from 'react';
import { DayCard } from './day-card';
import { useStore } from '@nanostores/react';
import { currentCalendarDate, setCalendarDate } from '../../stores/calendarDateStore';
import { currentCalendarView, setCalendarView, type CalendarView } from '../../stores/calendarViewStore';

/**
 * Displays a banner with calendar information based on selected view:
 * - Month view: Shows current month
 * - Week view: Shows the days of the specified week
 * - Day view: Shows the selected day in large format
 * The current day is highlighted
 */
export default function CalendarBanner() {
  // Use nanostores for current date and view
  const currentDate = useStore(currentCalendarDate);
  const view = useStore(currentCalendarView);
  const [days, setDays] = useState<{ day: string; date: string; isCurrentDay: boolean }[]>([]);
  const [shouldResetToToday, setShouldResetToToday] = useState<boolean>(true);

  // Listen for toggle group value changes
  useEffect(() => {
    const handleToggleChange = (e: CustomEvent) => {
      if (e.detail && e.detail.value) {
        const newView = e.detail.value as CalendarView;
        setCalendarView(newView);
        // If switching to day view, set the date to today if shouldResetToToday is true
        if (newView === 'day' && shouldResetToToday) {
          setCalendarDate(new Date());
        }
      }
    };
    window.addEventListener('toggle-group:value-change', handleToggleChange as EventListener);
    return () => {
      window.removeEventListener('toggle-group:value-change', handleToggleChange as EventListener);
    };
  }, [shouldResetToToday]);

  // Listen for day selector navigation events
  useEffect(() => {
    const handlePrev = () => {
      setShouldResetToToday(false);
      setCalendarDate(getPrevDate(currentDate, view));
    };
    const handleNext = () => {
      setShouldResetToToday(false);
      setCalendarDate(getNextDate(currentDate, view));
    };
    const handleToday = () => {
      setShouldResetToToday(true);
      setCalendarDate(new Date());
    };
    window.addEventListener('astro:calendar-prev', handlePrev);
    window.addEventListener('astro:calendar-next', handleNext);
    window.addEventListener('astro:calendar-today', handleToday);
    return () => {
      window.removeEventListener('astro:calendar-prev', handlePrev);
      window.removeEventListener('astro:calendar-next', handleNext);
      window.removeEventListener('astro:calendar-today', handleToday);
    };
  }, [view, currentDate]);

  // Update days whenever currentDate or view changes
  useEffect(() => {
    // Generate days based on the view
    if (view === 'week') {
      generateWeekDays(currentDate);
    } else {
      // For month or day view, we still need a days array to maintain component consistency
      generateWeekDays(currentDate);
    }
  }, [currentDate, view]);

  const getPrevDate = (date: Date, view: string) => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    return newDate;
  };

  const getNextDate = (date: Date, view: string) => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    return newDate;
  };

  const generateWeekDays = (weekDate: Date) => {
    const startOfWeek = new Date(weekDate);
    const dayOfWeek = startOfWeek.getDay(); // 0 for Sunday, 1 for Monday, etc.
    // Set to the first day (Monday) of the week
    // Adjust calculation: 0 (Sunday) should become 6, all other days shift by -1
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - daysToSubtract);
    // Get today's date for comparison
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const weekDays = [];
    // Create array with the 7 days of the week, starting from Monday
    for (let i = 0; i < 7; i++) {
      // Create a new date object for each day to avoid reference issues
      const currentDate = new Date(startOfWeek);
      // Add the correct number of days
      currentDate.setDate(startOfWeek.getDate() + i);
      // Simple direct comparison of year, month, and day
      const isCurrentDay =
        currentDate.getDate() === currentDay &&
        currentDate.getMonth() === currentMonth &&
        currentDate.getFullYear() === currentYear;
      weekDays.push({
        day: new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(currentDate),
        date: currentDate.getDate().toString(),
        isCurrentDay
      });
    }
    setDays(weekDays);
  };

  // Render different view based on the selected toggle
  const renderByView = () => {
    switch (view) {
      case 'month':
        // Month view: show current month in a large card
        return (
          <div className="w-full h-[5vw] min-h-[75px] bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-3xl font-bold text-black">
              {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)}
            </span>
          </div>
        );
      case 'day':
        // Day view: show current day in a large card (with gray background)
        return (
          <div className="w-full h-[5vw] min-h-[75px] bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-base font-normal text-black">
                {new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(currentDate)}
              </span>
              <span className="text-3xl font-bold text-black">
                {new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(currentDate)}
              </span>
            </div>
          </div>
        );
      case 'week':
      default:
        // Week view: show the 7 days of the week
        return (
          <div className="flex flex-1 justify-between">
            {days.map((day, index) => (
              <DayCard
                key={index}
                day={day.day}
                date={day.date}
                isSelected={day.isCurrentDay}
              />
            ))}
          </div>
        );
    }
  };

  return <>{renderByView()}</>;
} 