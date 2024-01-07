import { type Dispatch, type ReactNode, type SetStateAction } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/shared/ui/sheet";
import { type QRCodeState } from "~/shared/types";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import { Slider } from "~/shared/ui/slider";
import { ColorPicker } from "~/shared/components/color-picker";
import { InitialQrCodeState } from "~/shared/constants";
import { bufferToBase64 } from "~/shared/utils";

type ConfigureSheetProps = {
  state: QRCodeState;
  setState: Dispatch<SetStateAction<QRCodeState>>;
  trigger: ReactNode;
};

export const ConfigureSheet = ({
  trigger,
  state,
  setState,
}: ConfigureSheetProps) => {
  const handleUpdateState = <T extends keyof QRCodeState>(
    key: T,
    value: QRCodeState[T],
  ) => {
    setState((p) => ({ ...p, [key]: value }));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>QR Code Configuration</SheetTitle>
          <SheetDescription>Customize your qr code here.</SheetDescription>
        </SheetHeader>

        <section className={"my-6 flex w-full flex-col gap-6"}>
          <div className={"flex w-full flex-col gap-2"}>
            <Label>
              Data <span className={"text-destructive"}>*</span>
            </Label>

            <Input
              onChange={(e) => {
                handleUpdateState("data", (e.target as HTMLInputElement).value);
              }}
              value={state.data}
            />
          </div>

          <div className={"flex w-full flex-col gap-2"}>
            <Label>Title</Label>

            <Input
              onChange={(e) => {
                handleUpdateState(
                  "title",
                  (e.target as HTMLInputElement).value,
                );
              }}
              value={state.title}
              maxLength={16}
            />
          </div>

          <div className={"flex flex-col gap-2"}>
            <Label htmlFor="logo">Logo</Label>

            <input
              accept={".jpg, .jpeg, .png"}
              hidden={true}
              type="file"
              id="logo"
              onChange={async (e) => {
                const file = e.target?.files?.[0];

                if (file) {
                  const buffer = await file.arrayBuffer();
                  handleUpdateState("logo", bufferToBase64(buffer));
                }
              }}
            />

            <Button
              className={"justify-start"}
              asChild={true}
              variant={"ghost"}
            >
              <label className={"flex items-start"} htmlFor={"logo"}>
                {state.logo && (
                  <img
                    className={"mr-2 h-5 w-5 rounded-full border"}
                    alt={"Logo"}
                    src={state.logo}
                  />
                )}
                Choose image
              </label>
            </Button>
          </div>

          <div className={"flex w-full flex-col gap-4"}>
            <Label htmlFor="name">Corner Radius</Label>

            <Slider
              defaultValue={[state.cr]}
              onValueChange={(value) => {
                const [cr] = value;
                handleUpdateState("cr", Number(cr));
              }}
              max={15}
              step={1}
            />
          </div>

          <div className={"flex w-full flex-col gap-2"}>
            <Label htmlFor="name">Colors</Label>

            <div className={"flex items-center"}>
              <ColorPicker
                label={"Background"}
                value={state.bgColor}
                onChange={(bgColor) => {
                  handleUpdateState("bgColor", bgColor);
                }}
              />

              <ColorPicker
                label={"Foreground"}
                value={state.fgColor}
                onChange={(fgColor) => {
                  handleUpdateState("fgColor", fgColor);
                }}
              />
            </div>
          </div>
        </section>

        <SheetFooter>
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => {
              setState(InitialQrCodeState);
            }}
          >
            Reset
          </Button>

          <SheetClose asChild>
            <Button type="submit">Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
