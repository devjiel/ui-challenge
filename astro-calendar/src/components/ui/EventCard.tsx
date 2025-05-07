export default function EventCard({ event, backgroundColorClass }: {
    event: any,
    backgroundColorClass: string
}) {
    return (
        <div className={`event-content p-3 h-full overflow-hidden flex flex-col ${backgroundColorClass}`}>
            <div className="text-xs font-medium text-black">
                <span>{event.title}</span>
            </div>
            <div className="text-xs font-xs text-gray-600">
                <span>
                    {event.start?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    {event.end && ' - '}
                    {event.end?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
            {event.extendedProps?.location && (
                <div className="text-xs mt-1 flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {event.extendedProps.location}
                </div>
            )}
            {event.extendedProps?.attendees && event.extendedProps.attendees.length > 0 && (
                <div className="flex mt-2 -space-x-1">
                    {event.extendedProps.attendees.map((attendee: any, index: number) => (
                        <div key={index} className="w-8 h-8 rounded-full border-1 border-white overflow-hidden">
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
    )
}