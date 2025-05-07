import React, { useEffect, useState } from 'react';
import { DayCard } from './day-card';

interface CalendarBannerProps {
  week?: Date;
}

/**
 * Displays a banner with calendar information based on selected view:
 * - Month view: Shows current month
 * - Week view: Shows the days of the specified week
 * - Day view: Shows the selected day in large format
 * The current day is highlighted
 */
export function CalendarBanner({
  week = new Date(),
}: CalendarBannerProps) {
  const [days, setDays] = useState<{ day: string; date: string; isCurrentDay: boolean }[]>([]);
  const [view, setView] = useState<string>('week');
  const [currentDate, setCurrentDate] = useState<Date>(week);
  const [shouldResetToToday, setShouldResetToToday] = useState<boolean>(true);

  // Listen for toggle group value changes
  useEffect(() => {
    const handleToggleChange = (e: CustomEvent) => {
      if (e.detail && e.detail.value) {
        const newView = e.detail.value;
        setView(newView);

        // If switching to day view, set the date to today if shouldResetToToday is true
        if (newView === 'day' && shouldResetToToday) {
          setCurrentDate(new Date());
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
      // When user manually navigates, we should not reset to today anymore
      setShouldResetToToday(false);

      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        if (view === 'day') {
          newDate.setDate(newDate.getDate() - 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        }
        return newDate;
      });
    };

    const handleNext = () => {
      // When user manually navigates, we should not reset to today anymore
      setShouldResetToToday(false);

      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        if (view === 'day') {
          newDate.setDate(newDate.getDate() + 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        return newDate;
      });
    };

    const handleToday = () => {
      // Reset the flag when we go back to today
      setShouldResetToToday(true);
      setCurrentDate(new Date());
    };

    // Add event listeners for calendar navigation
    window.addEventListener('astro:calendar-prev', handlePrev);
    window.addEventListener('astro:calendar-next', handleNext);
    window.addEventListener('astro:calendar-today', handleToday);

    return () => {
      window.removeEventListener('astro:calendar-prev', handlePrev);
      window.removeEventListener('astro:calendar-next', handleNext);
      window.removeEventListener('astro:calendar-today', handleToday);
    };
  }, [view]);

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
              // No onClick handler since these are not clickable
              />
            ))}
          </div>
        );
    }
  };

  return <>{renderByView()}</>;
} 