import { ToggleGroup, ToggleGroupItem } from './toggle-group';


export function ReactToggleGroup() {

  return (
    <div className="flex flex-row gap-2">
    <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <div className="text-sm">Month</div>
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <div className="text-sm">Week</div>
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
            <div className="text-sm">Day</div>
        </ToggleGroupItem>
    </ToggleGroup>
</div>
  );
} 