import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import type { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import '../../styles/fullcalendar.css';

interface Event {
    id: string;
    title: string;
    start: Date | string;
    end?: Date | string;
    allDay?: boolean;
    color?: string;
    extendedProps?: {
        location?: string;
        description?: string;
        attendees?: Array<{ id: string; name: string; avatar?: string }>;
    };
}

// Interface pour l'événement personnalisé
interface ViewChangeEvent extends CustomEvent {
    detail: {
        value: string;
    };
}

export interface FullCalendarProps {
    initialEvents?: Event[];
    onEventClick?: (event: Event) => void;
    onDateSelect?: (selectInfo: DateSelectArg) => void;
}

export default function FullCalendarWrapper({ initialEvents = [], onEventClick, onDateSelect }: FullCalendarProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [currentView, setCurrentView] = useState<string>('timeGridWeek');
    const calendarRef = useRef<any>(null);

    useEffect(() => {
        const handlePrev = () => {
            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.prev();
                setSelectedDate(api.getDate());
            }
        };

        const handleNext = () => {
            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.next();
                setSelectedDate(api.getDate());
            }
        };

        const handleToday = () => {
            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.today();
                setSelectedDate(api.getDate());
            }
        };

        const handleViewChange = (e: CustomEvent<{ value: string }>) => {
            if (e.detail && e.detail.value) {
                const view = e.detail.value;
                handleViewChangeInternal(view);
            }
        };

        window.addEventListener('astro:calendar-prev', handlePrev);
        window.addEventListener('astro:calendar-next', handleNext);
        window.addEventListener('astro:calendar-today', handleToday);
        window.addEventListener('toggle-group:value-change', handleViewChange as EventListener);

        return () => {
            window.removeEventListener('astro:calendar-prev', handlePrev);
            window.removeEventListener('astro:calendar-next', handleNext);
            window.removeEventListener('astro:calendar-today', handleToday);
            window.removeEventListener('toggle-group:value-change', handleViewChange as EventListener);
        };
    }, []);

    const handleEventClick = (clickInfo: EventClickArg) => {
        setSelectedEvent(clickInfo.event.toPlainObject() as unknown as Event);
        setShowEventModal(true);

        if (onEventClick) {
            onEventClick(clickInfo.event as unknown as Event);
        }
    };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        if (onDateSelect) {
            onDateSelect(selectInfo);
        }
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            api.gotoDate(date);
        }
    };

    const handleViewChangeInternal = (view: string) => {
        let fullCalendarView = 'timeGridWeek';
        if (view === 'month') {
            fullCalendarView = 'dayGridMonth';
        } else if (view === 'week') {
            fullCalendarView = 'timeGridWeek';
        } else if (view === 'day') {
            fullCalendarView = 'timeGridDay';
        }

        setCurrentView(fullCalendarView);
        if (calendarRef.current) {
            const api = calendarRef.current.getApi();
            api.changeView(fullCalendarView);
        }

        // Émettre un événement pour informer les autres composants
        const viewChangeEvent = new CustomEvent('fullcalendar:view-change', {
            detail: {
                view: view,
                fcView: fullCalendarView
            }
        });
        window.dispatchEvent(viewChangeEvent);
    };

    const renderEventContent = (eventInfo: any) => {
        let eventClass = 'event-other';
        const title = eventInfo.event.title.toLowerCase();

        if (title.includes('booking') || title.includes('réservation')) {
            eventClass = 'event-booking';
        } else if (title.includes('design')) {
            eventClass = 'event-design';
        } else if (title.includes('development') || title.includes('développement')) {
            eventClass = 'event-development';
        } else if (title.includes('meeting') || title.includes('réunion')) {
            eventClass = 'event-meeting';
        } else if (title.includes('planning') || title.includes('planification')) {
            eventClass = 'event-planning';
        } else if (title.includes('review') || title.includes('revue')) {
            eventClass = 'event-review';
        }

        return (
            <div className={`event-content p-3 h-full overflow-hidden flex flex-col ${eventClass}`}>
                <div className="text-sm font-medium text-black">
                    <span>{eventInfo.event.title}</span>
                </div>
                <div className="text-sm font-medium text-gray-500">
                    <span>{eventInfo.event.start?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - {eventInfo.event.end?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {eventInfo.event.extendedProps?.location && (
                    <div className="text-xs mt-1 flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {eventInfo.event.extendedProps.location}
                    </div>
                )}
                {eventInfo.event.extendedProps?.attendees && eventInfo.event.extendedProps.attendees.length > 0 && (
                    <div className="flex mt-2 -space-x-1">
                        {eventInfo.event.extendedProps.attendees.map((attendee: any, index: number) => (
                            <div key={index} className="w-6 h-6 rounded-full border-1 border-white overflow-hidden">
                                {attendee.avatar ? (
                                    <img src={attendee.avatar} alt={attendee.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                                        {attendee.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="calendar-container h-full flex flex-col">
            <div className="flex-1 bg-gray-100">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={currentView}
                    headerToolbar={false}
                    dayHeaderFormat={{ weekday: 'long', day: 'numeric' }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    events={events.map(event => ({
                        ...event,
                        extendedProps: {
                            ...(event.extendedProps || {}),
                            attendees: event.extendedProps?.attendees,
                            location: event.extendedProps?.location || (Math.random() > 0.5 ? 'Park Lane Office' : null)
                        }
                    }))}
                    locale={frLocale}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    select={handleDateSelect}
                    allDaySlot={false}
                    slotDuration="00:30:00"
                    slotLabelInterval="01:00:00"
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        meridiem: false
                    }}
                    slotMinTime="06:00:00"
                    slotMaxTime="23:59:00"
                    height="100%"
                    stickyHeaderDates={true}
                    nowIndicator={true}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    datesSet={(dateInfo) => {
                        setSelectedDate(dateInfo.start);

                        // Émettre un événement pour informer le composant Astro du changement de date
                        const dateChangeEvent = new CustomEvent('fullcalendar:date-change', {
                            detail: { date: dateInfo.start }
                        });
                        window.dispatchEvent(dateChangeEvent);

                        // Mettre à jour la vue si elle a changé
                        if (currentView !== dateInfo.view.type) {
                            setCurrentView(dateInfo.view.type);

                            // Convertir la vue FullCalendar en format simple
                            const simpleView = dateInfo.view.type === 'dayGridMonth'
                                ? 'month'
                                : (dateInfo.view.type === 'timeGridWeek' ? 'week' : 'day');

                            // Émettre un événement pour informer le composant Astro du changement de vue
                            const viewChangeEvent = new CustomEvent('fullcalendar:view-change', {
                                detail: {
                                    view: simpleView,
                                    fcView: dateInfo.view.type
                                }
                            });
                            window.dispatchEvent(viewChangeEvent);
                        }
                    }}
                    dayHeaders={false}
                />
            </div>

            {showEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Meet with {selectedEvent?.title.split(' ').pop()}</h2>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div>Tuesday, 18 December</div>
                            </div>

                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>06:00 - 07:00</div>
                            </div>

                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>Park Lane Office</div>
                            </div>
                        </div>

                        <div className="mt-6 space-x-2">
                            <button className="px-4 py-2 bg-black text-white rounded-md">Add Event</button>
                            <button
                                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md"
                                onClick={() => setShowEventModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div
                        className="fixed inset-0 bg-black bg-opacity-25 -z-10"
                        onClick={() => setShowEventModal(false)}
                    ></div>
                </div>
            )}
        </div>
    );
} 