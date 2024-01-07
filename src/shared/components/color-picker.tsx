import { HexColorPicker } from "react-colorful";

import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { Button } from "~/shared/ui/button";

type ColorPickerPopoverProps = {
  label: string;
  value?: string;
  onChange?: (color: string) => void;
};

export const ColorPicker = ({
  label,
  value,
  onChange,
}: ColorPickerPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={"ghost"}>
          <div
            style={{ background: value }}
            className={"mr-2 h-5 w-5 rounded-full border"}
          />
          {label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className={"flex w-auto items-center justify-center"}>
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};
