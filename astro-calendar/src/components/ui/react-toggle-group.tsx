import { ToggleGroup, ToggleGroupItem } from './toggle-group';
import { useState, useEffect } from 'react';

interface ReactToggleGroupProps {
  initialValue?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ReactToggleGroup({
  initialValue,
  defaultValue = "week",
  onValueChange
}: ReactToggleGroupProps) {
  const [value, setValue] = useState(initialValue || defaultValue);

  // Initialiser un écouteur d'événements pour les changements de vue depuis FullCalendar
  useEffect(() => {
    const handleViewChange = (e: CustomEvent) => {
      if (e.detail && e.detail.view) {
        setValue(e.detail.view);
      }
    };

    window.addEventListener('fullcalendar:view-change', handleViewChange as EventListener);

    return () => {
      window.removeEventListener('fullcalendar:view-change', handleViewChange as EventListener);
    };
  }, []);

  // Mettre à jour la valeur lorsque initialValue change
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  // Émettre un événement personnalisé lors du changement de valeur
  const emitCustomEvent = (val: string) => {
    console.log('Toggle group value changed to:', val);
    const event = new CustomEvent('toggle-group:value-change', {
      detail: { value: val }
    });
    window.dispatchEvent(event);
  };

  // Fonction pour gérer le changement de valeur
  const handleValueChange = (val: string) => {
    if (val) {
      setValue(val);
      if (onValueChange) {
        onValueChange(val);
      }
      emitCustomEvent(val);
    }
  };

  return (
    <div className="flex flex-row gap-2 bg-gray-100 rounded-xl p-2">
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={handleValueChange}
      >
        <ToggleGroupItem value="month" aria-label="Toggle month" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-l-md px-4 py-2 font-medium">
          <div className={`${value === "month" ? "font-bold" : "font-normal"} text-base px-4`}>Month</div>
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Toggle week" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 px-4 py-2 font-medium">
          <div className={`${value === "week" ? "font-bold" : "font-normal"} text-base px-4`}>Week</div>
        </ToggleGroupItem>
        <ToggleGroupItem value="day" aria-label="Toggle day" className="data-[state=on]:bg-white data-[state=on]:shadow-none data-[state=off]:bg-gray-100 hover:bg-gray-200 rounded-r-md px-4 py-2 font-medium">
          <div className={`${value === "day" ? "font-bold" : "font-normal"} text-base px-4`}>Day</div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
} 