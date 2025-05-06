import type { EventColor } from '@/components/event-card.astro';

// Define a type for the event structure
export interface CalendarEvent {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    dayIndex: number; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday (or adjust as needed)
    color: EventColor;
    attendees?: string[];
    widthPercent?: number;
    leftPercent?: number;
}

// Dummy event data
export const events: CalendarEvent[] = [
    {
        id: 0,
        title: 'Running',
        startTime: '06:00',
        endTime: '08:00',
        dayIndex: 0, // Sunday
        color: 'yellow',
        widthPercent: 100,
        leftPercent: 0,
    },
    {
        id: 1,
        title: 'Booking taxi app',
        startTime: '06:00',
        endTime: '07:30',
        dayIndex: 1, // Monday
        color: 'blue',
        attendees: ['/assets/images/avatar-1.png', '/assets/images/avatar-2.png', '/assets/images/avatar-3.png'],
        widthPercent: 50 - 1,
        leftPercent: 0,
    },
    {
        id: 2,
        title: 'Design onboarding',
        startTime: '06:00',
        endTime: '07:10',
        dayIndex: 1, // Monday
        color: 'green',
        widthPercent: 50 - 1,
        leftPercent: 50 + 1,
    },
    {
        id: 3,
        title: 'Development meet',
        startTime: '08:00',
        endTime: '09:00',
        dayIndex: 1, // Monday
        color: 'purple',
        widthPercent: 100,
        leftPercent: 0,
    },
    // Added events for other days
    {
        id: 4,
        title: 'Team Sync',
        startTime: '10:00',
        endTime: '11:00',
        dayIndex: 2, // Tuesday
        color: 'pink',
        widthPercent: 100,
        leftPercent: 0,
    },
    {
        id: 5,
        title: 'Client Call',
        startTime: '14:00',
        endTime: '15:00',
        dayIndex: 3, // Wednesday
        color: 'blue',
        attendees: ['/assets/images/avatar-4.png'],
        widthPercent: 100,
        leftPercent: 0,
    },
    {
        id: 6,
        title: 'Project Planning',
        startTime: '09:00',
        endTime: '11:30',
        dayIndex: 4, // Thursday
        color: 'green',
        widthPercent: 70,
        leftPercent: 0,
    },
    {
        id: 7,
        title: 'Review Session',
        startTime: '10:00',
        endTime: '12:00',
        dayIndex: 4, // Thursday
        color: 'yellow',
        widthPercent: 30 - 1,
        leftPercent: 70 + 1,
    },
    {
        id: 8,
        title: 'Focus Work',
        startTime: '13:00',
        endTime: '16:00',
        dayIndex: 5, // Friday
        color: 'purple',
        widthPercent: 100,
        leftPercent: 0,
    },
    {
        id: 9,
        title: 'Weekend Prep',
        startTime: '17:00',
        endTime: '18:00',
        dayIndex: 5, // Friday
        color: 'pink',
        attendees: ['/assets/images/avatar-1.png', '/assets/images/avatar-2.png'],
        widthPercent: 100,
        leftPercent: 0,
    },
    {
        id: 10,
        title: 'Personal Project',
        startTime: '10:00',
        endTime: '14:00',
        dayIndex: 6, // Saturday
        color: 'yellow',
        widthPercent: 100,
        leftPercent: 0,
    },
]; 