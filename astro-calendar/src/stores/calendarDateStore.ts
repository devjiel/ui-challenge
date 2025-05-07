import { atom } from 'nanostores';

export const currentCalendarDate = atom<Date>(new Date());

export function setCalendarDate(date: Date) {
    currentCalendarDate.set(date);
}

export function goToToday() {
    currentCalendarDate.set(new Date());
}

export function goToPreviousPeriod() {
    const event = new CustomEvent('calendar:go-previous');
    window.dispatchEvent(event);
}

export function goToNextPeriod() {
    const event = new CustomEvent('calendar:go-next');
    window.dispatchEvent(event);
} 