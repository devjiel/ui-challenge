import React from 'react';

export default function EventDetailPopupCard({ event, cardPosition, cardRef, onClose, onDelete }: {
    event: any,
    cardPosition: { top: number; left: number },
    cardRef: React.RefObject<HTMLDivElement | null>,
    onClose: () => void,
    onDelete: () => void
}) {
    return (
        <div
            ref={cardRef}
            className="absolute z-50"
            style={{
                top: cardPosition.top,
                left: cardPosition.left,
                width: 320,
            }}
        >
            <div className="bg-white rounded-lg shadow-xl p-6">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <div className="text-sm text-gray-500 mb-2">
                    {/* Event date and time */}
                    {event.start && (
                        <div>
                            {(() => {
                                const start = new Date(event.start);
                                const end = event.end ? new Date(event.end) : null;
                                return (
                                    <>
                                        <span>{start.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span><br />
                                        <span>{start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            {end && ` - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
                                        </span>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
                {/* Location */}
                {event.extendedProps?.location && (
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {event.extendedProps.location}
                    </div>
                )}
                {/* Description */}
                {event.extendedProps?.description && (
                    <div className="text-sm text-gray-700 mb-2">
                        {event.extendedProps.description}
                    </div>
                )}
                {/* Attendees */}
                {event.extendedProps?.attendees && event.extendedProps.attendees.length > 0 && (
                    <div className="mb-2">
                        <div className="text-xs text-gray-500 mb-1">Participants :</div>
                        <div className="flex -space-x-1">
                            {event.extendedProps.attendees.map((attendee: any, idx: number) => (
                                <div key={attendee.id || idx} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center text-xs text-gray-700">
                                    {attendee.avatar ? (
                                        <img src={attendee.avatar} alt={attendee.name} className="w-full h-full object-cover" />
                                    ) : (
                                        attendee.name.charAt(0)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md"
                        onClick={onDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
} 