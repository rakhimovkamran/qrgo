import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useMediaQuery } from "usehooks-ts";

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
import { QrCard } from "~/shared/components/qr-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "~/shared/ui/drawer";
import { Textarea } from "~/shared/ui/textarea";

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
  const matches = useMediaQuery("(max-width: 640px)");

  if (matches) {
    return (
      <Drawer shouldScaleBackground={true}>
        <DrawerTrigger asChild={true}>{trigger}</DrawerTrigger>
        <DrawerContent className={"max-h-[96%]"}>
          <DrawerHeader>
            <div className={"mb-2 mt-1 flex items-center justify-center"}>
              <QrCard
                data={state.data}
                size={120}
                bgColor={state.bgColor}
                fgColor={state.fgColor}
                cr={state.cr}
                title={state.title}
                logo={state.logo}
              />
            </div>
          </DrawerHeader>

          <div className={"overflow-scroll px-4"}>
            <ConfigureForm state={state} setState={setState} />
          </div>

          <DrawerFooter>
            <Button>Done</Button>

            <DrawerClose>
              <Button className={"w-full"} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>QR Code Configuration</SheetTitle>
          <SheetDescription>Customize your qr code here.</SheetDescription>
        </SheetHeader>

        <div className={"mt-4 flex items-center justify-center sm:hidden"}>
          <QrCard
            data={state.data}
            size={100}
            bgColor={state.bgColor}
            fgColor={state.fgColor}
            cr={state.cr}
            title={state.title}
            logo={state.logo}
          />
        </div>

        <ConfigureForm state={state} setState={setState} />

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

const ConfigureForm = ({
  state,
  setState,
}: {
  state: QRCodeState;
  setState: Dispatch<SetStateAction<QRCodeState>>;
}) => {
  const handleUpdateState = <T extends keyof QRCodeState>(
    key: T,
    value: QRCodeState[T],
  ) => {
    setState((p) => ({ ...p, [key]: value }));
  };

  return (
    <section className={"my-6 flex w-full flex-col gap-6"}>
      <div className={"flex w-full flex-col gap-2"}>
        <Label>
          Data <span className={"text-destructive"}>*</span>
        </Label>

        <Textarea
          onChange={(e) => {
            const data = (e.target as HTMLTextAreaElement).value;

            if (data.length > 0) {
              handleUpdateState("data", data);
            }
          }}
          value={state.data}
        />
      </div>

      <div className={"flex w-full flex-col gap-2"}>
        <Label>Title</Label>

        <Input
          onChange={(e) => {
            handleUpdateState("title", (e.target as HTMLInputElement).value);
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

        <Button className={"justify-start"} asChild={true} variant={"ghost"}>
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
  );
};
