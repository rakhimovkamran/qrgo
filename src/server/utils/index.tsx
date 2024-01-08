import { type NextRequest } from "next/server";
import { ImageResponse } from "next/og";

import { bufferToBase64, clamp, getPercentage } from "~/shared/utils";
import { calculateSizes } from "~/shared/components/qr-card";

export const fetchImageAsBase64 = async (
  url: string,
): Promise<string | ArrayBuffer | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const buffer = await blob.arrayBuffer();

    return bufferToBase64(buffer);
  } catch (error) {
    console.error("Error fetching or converting image:", error);
    return null;
  }
};

export const resolveQueryParam = (param: string | null, fallback = "") => {
  return param ?? fallback;
};

export const resolveQueryParams = (req: NextRequest) => {
  const url = new URL(req.url);

  const as = resolveQueryParam(url.searchParams.get("as"), "svg");

  const data = resolveQueryParam(
    decodeURIComponent(url.searchParams.get("data") ?? ""),
  );

  const size = clamp(
    Number(resolveQueryParam(url.searchParams.get("s"), "200")),
    100,
    1000,
  );

  const bgColor = resolveQueryParam(url.searchParams.get("bg"), "#000");
  const fgColor = resolveQueryParam(url.searchParams.get("fg"), "#FFF");

  const cr = clamp(
    Number(resolveQueryParam(url.searchParams.get("cr"), "10")),
    0,
    15,
  );

  const title = resolveQueryParam(url.searchParams.get("title"));
  const logo = resolveQueryParam(url.searchParams.get("logo"));

  const download = resolveQueryParam(url.searchParams.get("download"));

  return {
    as,
    data,
    size,
    bgColor,
    fgColor,
    cr,
    title,
    logo,
    download,
  };
};
export const processLogo = async (req: NextRequest, logoUrl: string) => {
  if (req.method === "POST") {
    const bodyParams = (await req.json()) as { logo: string };
    logoUrl = bodyParams.logo || logoUrl;
  }

  return logoUrl.startsWith("data")
    ? logoUrl
    : await fetchImageAsBase64(logoUrl);
};

export const respondBasedOnType = (
  params: ReturnType<typeof resolveQueryParams>,
  markup: string,
  logo: string,
) => {
  const filename = `qrgo_${Date.now()}.svg`;
  const headers = { "Content-Type": "image/svg+xml" };

  if (params.as === "svg") {
    if (params.download === "true") {
      //@ts-expect-error TODO: Resolve typing issue
      headers["Content-Disposition"] = `attachment; filename="${filename}"`;
    }
    return new Response(markup, { headers });
  } else if (params.as === "png") {
    return returnQrCardImageResponse(markup, params, logo);
  }
};

export const returnQrCardImageResponse = (
  markup: string,
  params: ReturnType<typeof resolveQueryParams>,
  logo: string,
) => {
  const cardBase = `data:image/svg+xml;base64,${btoa(
    decodeURIComponent(encodeURIComponent(markup)),
  )}`;

  const { width, height, logoConfig, titleConfig, padding } = calculateSizes({
    size: params.size,
    title: params.title,
  });

  const card = (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        position: "relative",
        display: "flex",
        background: params.bgColor,
        justifyContent: "center",
        borderRadius: getPercentage(params.cr, params.size + padding),
      }}
    >
      <img alt={"Base QR Card"} src={cardBase} />

      {logo && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,

            width: logoConfig.wrapperSize + "px",
            height: logoConfig.wrapperSize + "px",

            transform: `translate(${logoConfig.position}px, ${
              logoConfig.position + (params.title ? titleConfig.offset : 0)
            }px)`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt={"Logo"}
            src={logo}
            style={{
              width: logoConfig.imageSize + "px",
              height: logoConfig.imageSize + "px",
            }}
          />
        </div>
      )}

      {params.title && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: titleConfig.marginTop + "px",
            left: 0,

            width: "100%",
            fontSize: titleConfig.size,
            color: params.fgColor,

            fontFamily: "sans-serif",
            fontWeight: 800,
          }}
        >
          {params.title}
        </div>
      )}
    </div>
  );

  return new ImageResponse(card, {
    width,
    height,
  });
};
