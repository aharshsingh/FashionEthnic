"use client";

import { useSliderWithInput } from "../components/ui/slider/useSliderWithInput";
import { Button } from "../components/ui/slider/button";
import { Input } from "../components/ui/slider/input";
import { Label } from "../components/ui/slider/label";
import { Slider } from "../components/ui/slider/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/slider/tooltip";
import { RotateCcw } from "lucide-react";

function SliderComponent() {
  const minValue = 0.0;
  const maxValue = 5;
  const initialValue = [1.25];
  const defaultValue = [1];

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
  } = useSliderWithInput({ minValue, maxValue, initialValue, defaultValue });

  return (
    <div className="space-y-3 min-w-[300px]">
      <div className="flex items-center justify-between gap-2">
        <Label>Product Rating</Label>
        <div className="flex items-center gap-1">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  aria-label="Reset"
                  onClick={resetToDefault}
                >
                  <RotateCcw size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 text-xs">Reset to default</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            className="h-7 w-12 px-2 py-0"
            type="text"
            inputMode="decimal"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(e, 0)}
            onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateAndUpdateValue(inputValues[0], 0);
              }
            }}
            aria-label="Enter value"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Slider
          className="grow"
          value={sliderValue}
          onValueChange={handleSliderChange}
          min={minValue}
          max={maxValue}
          step={0.01}
          aria-label="Temperature"
        />
      </div>
    </div>
  );
}

export { SliderComponent };
