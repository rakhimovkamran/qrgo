import { DownloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import { QrCard } from "~/shared/components/qr-card";
import { Button } from "~/shared/ui/button";
import { ConfigureSheet } from "~/shared/components/configure-sheet";
import { type QRCodeState } from "~/shared/types";
import { InitialQrCodeState } from "~/shared/constants";
import { Meta } from "~/shared/components/meta";
import { Footer } from "~/shared/components/footer";
import { downloadSvgFromResponse } from "~/shared/utils";

export default function Home() {
  const [state, setState] = useState<QRCodeState>(InitialQrCodeState);

  const handleDownload = async () => {
    const params = new URLSearchParams({
      data: state.data,
      bg: state.bgColor,
      fg: state.fgColor,
      title: state.title,
      cr: `${state.cr}`,
    });

    const response = await fetch(`/api/qr?${params.toString()}`, {
      method: "POST",

      body: JSON.stringify({
        logo: state.logo ? encodeURIComponent(state.logo) : "",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    await downloadSvgFromResponse(response);
  };

  return (
    <>
      <Meta title={"Qrgo"} description={"Get your minimalistic QR."} />

      <main
        className={
          "mx-auto flex max-w-xl flex-col items-center justify-center px-4 pt-36"
        }
      >
        <div
          className={"squared-pattern absolute top-0 -z-20 h-[400px] w-full"}
        />

        <header className={"mb-5 flex flex-col items-center justify-center"}>
          <h1 className={"relative mb-4 text-7xl font-semibold"}>Qrgo</h1>

          <p className={"text-xl font-light text-gray-600"}>
            Get your minimalistic QR.
          </p>
        </header>

        <section className={"flex flex-col items-center justify-center p-4"}>
          <div className={"z-[51]"}>
            <QrCard
              data={state.data}
              size={state.size}
              bgColor={state.bgColor}
              fgColor={state.fgColor}
              cr={state.cr}
              title={state.title}
              logo={state.logo}
            />
          </div>

          <section className={"mt-10 grid w-full grid-cols-2 gap-3"}>
            <ConfigureSheet
              state={state}
              setState={setState}
              trigger={
                <Button
                  className={"w-full p-0"}
                  size={"lg"}
                  variant={"outline"}
                >
                  Configure
                </Button>
              }
            />

            <Button
              onClick={handleDownload}
              className={"w-full p-0"}
              size={"lg"}
              variant={"ghost"}
            >
              Download <DownloadIcon className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </section>

        <Footer
          links={[
            { label: "GitHub", href: "https://github.com/rakhimovkamran/qrgo" },
            { label: "API Guide", href: "/api-guide" },
          ]}
        />
      </main>
    </>
  );
}
