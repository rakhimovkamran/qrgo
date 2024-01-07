import { type NextRequest } from "next/server";

import { bufferToBase64, clamp } from "~/shared/utils";

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

export const resolveQueryParams = (req: NextRequest) => {
  const url = new URL(req.url);

  const data = url.searchParams.get("data") ?? "";
  const size = Number(url.searchParams.get("s") ?? "200");

  const bgColor = url.searchParams.get("bg") ?? "#000000";
  const fgColor = url.searchParams.get("fg") ?? "#FFFFFF";
  const cr = clamp(Number(url.searchParams.get("cr") ?? "10"), 0, 15);

  const title = url.searchParams.get("title") ?? "";
  const logo = url.searchParams.get("logo") ?? "";

  const download = url.searchParams.get("download") ?? "";

  return {
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
