// Demo events mock for calendar
// This file exports a list of demo events for use in the application

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const inThreeDays = new Date();
inThreeDays.setDate(today.getDate() + 3);

export const demoEvents = [
    // Événements pour aujourd'hui
    {
        id: '1',
        title: 'Booking taxi app',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 30),
        color: '#DBEAFE',
        extendedProps: {
            attendees: [
                { id: '1', name: 'User 1', avatar: 'assets/images/avatar1.jpg' },
                { id: '2', name: 'User 2', avatar: 'assets/images/avatar2.jpg' },
                { id: '3', name: 'User 3', avatar: 'assets/images/avatar3.jpg' }
            ]
        }
    },
    {
        id: '2',
        title: 'Design onboarding',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 10),
        color: '#D1FAE5'
    },
    {
        id: '3',
        title: 'Development meet',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        color: '#E5E7EB'
    },
    // Événements pour demain
    {
        id: '4',
        title: 'Development meet',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 40),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
        color: '#E5E7EB'
    },
    {
        id: '5',
        title: 'Book offsite',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 7, 30),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
        color: '#E5E7EB'
    },
    {
        id: '6',
        title: 'Design session',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 7, 50),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 30),
        color: '#FEF3C7',
        extendedProps: {
            attendees: [
                { id: '4', name: 'User 4', avatar: 'assets/images/avatar1.jpg' },
                { id: '5', name: 'User 5', avatar: 'assets/images/avatar2.jpg' },
                { id: '6', name: 'User 6', avatar: 'assets/images/avatar3.jpg' }
            ]
        }
    },
    {
        id: '7',
        title: 'Design Review',
        start: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 40),
        end: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 30),
        color: '#DBEAFE'
    },
    // Événements pour dans trois jours
    {
        id: '8',
        title: 'Planning tasks',
        start: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 7, 50),
        end: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 8, 30),
        color: '#E0E7FF'
    },
    {
        id: '9',
        title: 'Design our website',
        start: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 8, 30),
        end: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 10, 50),
        color: '#FFEDD5'
    },
    {
        id: '10',
        title: 'New project',
        start: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 10, 45),
        end: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 12, 30),
        color: '#DBEAFE',
        extendedProps: {
            description: 'Clients Brief'
        }
    },
    {
        id: '11',
        title: 'Unboarding meet',
        start: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 10, 50),
        end: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 12, 0),
        color: '#FBCFE8',
        extendedProps: {
            attendees: [
                { id: '7', name: 'User 7', avatar: 'assets/images/avatar2.jpg' },
                { id: '8', name: 'User 8', avatar: 'assets/images/avatar1.jpg' }
            ]
        }
    },
    {
        id: '12',
        title: 'Meet with Jonson Rider',
        start: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 6, 0),
        end: new Date(inThreeDays.getFullYear(), inThreeDays.getMonth(), inThreeDays.getDate(), 7, 0),
        color: '#F3E8FF',
        extendedProps: {
            location: 'Park Lane Office'
        }
    }
];
