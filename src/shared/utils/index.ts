import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getPercentage = (percent: number, total: number) => {
  return (percent / 100) * total;
};

export const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

export const bufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = "";

  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    //@ts-expect-error TODO: Resolve type issue
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
};

export const downloadImageResponse = async (
  response: Response,
  format: "svg" | "png",
) => {
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `qrgo_${Date.now()}.${format}`;
  document.body.appendChild(a);

  a.click();
  window.URL.revokeObjectURL(url);
};
