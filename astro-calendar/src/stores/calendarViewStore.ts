import { atom } from 'nanostores';

// Define the type for the calendar view
export type CalendarView = 'day' | 'week' | 'month' | 'year'; // Add other views if needed

// Atom to hold the current view state
// Initialize with a default view, e.g., 'week'
export const currentCalendarView = atom<CalendarView>('week');

// Function to update the calendar view
export function setCalendarView(newView: CalendarView) {
    currentCalendarView.set(newView);
} 