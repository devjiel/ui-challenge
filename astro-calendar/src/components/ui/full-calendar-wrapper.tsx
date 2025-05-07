import { useState, useRef, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import type { EventClickArg, DateSelectArg, EventContentArg } from '@fullcalendar/core';
import '../../styles/fullcalendar.css';
import EventDetailPopupCard from './EventDetailPopupCard';
import EventCard from './EventCard';
import { currentCalendarView, setCalendarView, type CalendarView } from '../../stores/calendarViewStore';
import { currentCalendarDate, setCalendarDate } from '../../stores/calendarDateStore';

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

export interface FullCalendarProps {
    initialEvents?: Event[];
    onEventClick?: (event: Event) => void;
    onDateSelect?: (selectInfo: DateSelectArg) => void;
}

export default function FullCalendarWrapper({ initialEvents = [], onEventClick, onDateSelect }: FullCalendarProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(currentCalendarDate.get());
    const [currentView, setCurrentView] = useState<string>(mapCalendarViewToFullCalendarView(currentCalendarView.get()));
    const calendarRef = useRef<any>(null);
    const [cardPosition, setCardPosition] = useState<{ top: number; left: number; side: 'left' | 'right' } | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    const isUpdatingFromStore = useRef(false);
    const isUpdatingFromCalendar = useRef(false);

    const colorNameToTailwindClass: Record<string, string> = {
        blue: "bg-[var(--color-blue-custom)]",
        green: "bg-[var(--color-green-custom)]",
        yellow: "bg-[var(--color-yellow-custom)]",
        purple: "bg-[var(--color-purple-custom)]",
        pink: "bg-[var(--color-pink-custom)]",
        test: "bg-[var(--color-test)]",
    };

    const getEventLocation = (event: Event) => {
        if (event.extendedProps) {
            if (typeof event.extendedProps.location === 'string') {
                return event.extendedProps.location;
            }
            if (event.extendedProps.location === null) {
                return null;
            }
        }
        return Math.random() > 0.5 ? 'Park Lane Office' : null;
    };

    const processedEvents = useMemo(() => {
        return events.map(event => ({
            ...event,
            extendedProps: {
                ...(event.extendedProps || {}),
                attendees: event.extendedProps?.attendees,
                description: event.extendedProps?.description,
                location: getEventLocation(event)
            }
        }));
    }, [events]);

    function mapCalendarViewToFullCalendarView(view: CalendarView): string {
        switch (view) {
            case 'month': return 'dayGridMonth';
            case 'week': return 'timeGridWeek';
            case 'day': return 'timeGridDay';
            default: return 'timeGridWeek';
        }
    }

    useEffect(() => {
        const unsubscribe = currentCalendarDate.subscribe((newDate) => {
            if (isUpdatingFromCalendar.current) {
                return;
            }

            setSelectedDate(newDate);

            isUpdatingFromStore.current = true;

            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.gotoDate(newDate);
            }

            setTimeout(() => {
                isUpdatingFromStore.current = false;
            }, 10);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = currentCalendarView.subscribe((newView) => {
            const fullCalendarView = mapCalendarViewToFullCalendarView(newView);
            setCurrentView(fullCalendarView);

            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.changeView(fullCalendarView);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handlePrevious = () => {
            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.prev();
                setCalendarDate(api.getDate());
            }
        };

        const handleNext = () => {
            if (calendarRef.current) {
                const api = calendarRef.current.getApi();
                api.next();
                setCalendarDate(api.getDate());
            }
        };

        window.addEventListener('calendar:go-previous', handlePrevious);
        window.addEventListener('calendar:go-next', handleNext);
        window.addEventListener('astro:calendar-prev', handlePrevious);
        window.addEventListener('astro:calendar-next', handleNext);
        window.addEventListener('astro:calendar-today', () => { });
        window.addEventListener('toggle-group:value-change', ((e: CustomEvent<{ value: string }>) => {
            if (e.detail && e.detail.value) {
                const view = e.detail.value as CalendarView;
                setCalendarView(view);
            }
        }) as EventListener);

        return () => {
            window.removeEventListener('calendar:go-previous', handlePrevious);
            window.removeEventListener('calendar:go-next', handleNext);
            window.removeEventListener('astro:calendar-prev', handlePrevious);
            window.removeEventListener('astro:calendar-next', handleNext);
            window.removeEventListener('astro:calendar-today', () => { });
            window.removeEventListener('toggle-group:value-change', ((e: CustomEvent<any>) => { }) as EventListener);
        };
    }, []);

    useEffect(() => {
        if (!showEventModal) return;
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setShowEventModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEventModal]);

    const handleEventClick = (clickInfo: EventClickArg) => {
        const eventData = clickInfo.event.toPlainObject() as unknown as Event;
        setSelectedEvent(eventData);

        if (!clickInfo.el) {
            setShowEventModal(false);
            setCardPosition(null);
            return;
        }
        const eventRect = clickInfo.el.getBoundingClientRect();

        const calendarApi = calendarRef.current?.getApi();
        const calendarElement = calendarApi?.el;

        if (!calendarElement) {
            setShowEventModal(false);
            setCardPosition(null);
            return;
        }
        const calendarRect = calendarElement.getBoundingClientRect();

        const eventMidPoint = eventRect.left + eventRect.width / 2;
        const viewPortMidPoint = window.innerWidth / 2;
        const side: 'left' | 'right' = eventMidPoint < viewPortMidPoint ? 'right' : 'left';

        let cardLeftPosition: number;
        const cardWidth = 320;
        const margin = 8;

        if (side === 'right') {
            cardLeftPosition = (eventRect.right - calendarRect.left) + margin;
        } else {
            cardLeftPosition = (eventRect.left - calendarRect.left) - cardWidth - margin;
        }

        const newCardPosition = {
            top: eventRect.top - calendarRect.top,
            left: cardLeftPosition,
            side,
        };

        setCardPosition(newCardPosition);
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

    const renderEventContent = (eventInfo: EventContentArg) => {
        const title = eventInfo.event.title.toLowerCase();
        let eventClassBasedOnTitle = 'event-other';
        if (title.includes('booking') || title.includes('réservation')) {
            eventClassBasedOnTitle = 'event-booking';
        } else if (title.includes('design')) {
            eventClassBasedOnTitle = 'event-design';
        } else if (title.includes('development') || title.includes('développement')) {
            eventClassBasedOnTitle = 'event-development';
        } else if (title.includes('meeting') || title.includes('réunion')) {
            eventClassBasedOnTitle = 'event-meeting';
        } else if (title.includes('planning') || title.includes('planification')) {
            eventClassBasedOnTitle = 'event-planning';
        } else if (title.includes('review') || title.includes('revue')) {
            eventClassBasedOnTitle = 'event-review';
        }

        const colorName = eventInfo.event.extendedProps?.color || eventInfo.event.backgroundColor || eventInfo.event.borderColor;

        let backgroundColorClass = '';
        if (typeof colorName === 'string' && colorNameToTailwindClass[colorName]) {
            backgroundColorClass = colorNameToTailwindClass[colorName];
        } else {
            backgroundColorClass = 'bg-gray-100';
        }

        return (
            <EventCard event={eventInfo.event} backgroundColorClass={backgroundColorClass} />
        );
    };

    return (
        <div className="calendar-container h-full flex flex-col relative">
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
                    events={processedEvents}
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
                        if (isUpdatingFromStore.current) {
                            return;
                        }

                        isUpdatingFromCalendar.current = true;

                        setCalendarDate(dateInfo.start);

                        if (currentView !== dateInfo.view.type) {
                            setCurrentView(dateInfo.view.type);

                            const simpleView = dateInfo.view.type === 'dayGridMonth'
                                ? 'month'
                                : (dateInfo.view.type === 'timeGridWeek' ? 'week' : 'day');

                            setCalendarView(simpleView as CalendarView);
                        }

                        setTimeout(() => {
                            isUpdatingFromCalendar.current = false;
                        }, 10);
                    }}
                    dayHeaders={false}
                />
            </div>

            {(() => {
                if (showEventModal && cardPosition && selectedEvent) {
                    return (
                        <EventDetailPopupCard
                            event={selectedEvent}
                            cardPosition={cardPosition}
                            cardRef={cardRef}
                            onClose={() => setShowEventModal(false)}
                            onDelete={() => {
                                setEvents(events.filter(event => event.id !== selectedEvent.id));
                                setShowEventModal(false);
                            }}
                        />
                    );
                }
                return null;
            })()}
        </div>
    );
} 