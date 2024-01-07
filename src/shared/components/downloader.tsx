import { type ReactNode, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { RadioGroup, RadioGroupItem } from "~/shared/ui/radio-group";
import { Label } from "~/shared/ui/label";
import { Button } from "~/shared/ui/button";

const sizes = [200, 400, 600, 1000];

type DownloaderProps = {
  onDownload: (format: "svg" | "png", size: number) => void;
  trigger: ReactNode;
};

export const Downloader = ({ trigger, onDownload }: DownloaderProps) => {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<"svg" | "png">("svg");

  const handleDownload = (size: number) => {
    setOpen(false);
    onDownload(format, size);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={true}>{trigger}</PopoverTrigger>

      <PopoverContent className={"flex w-auto items-center justify-center p-5"}>
        <RadioGroup
          onValueChange={(v: "svg" | "png") => setFormat(v)}
          defaultValue={format}
          className={"flex flex-col gap-5"}
        >
          <section className={"flex gap-5"}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="svg" id="svg" />
              <Label htmlFor="svg">SVG</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="png" />
              <Label htmlFor="png">PNG</Label>
            </div>
          </section>

          <section className={"flex flex-col gap-2"}>
            {sizes.map((size) => (
              <Button
                onClick={() => handleDownload(size)}
                variant={"outline"}
                key={size}
              >
                {size}px
              </Button>
            ))}
          </section>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
