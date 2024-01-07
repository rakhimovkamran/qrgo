import { type NextRequest } from "next/server";
import { renderToStaticMarkup } from "react-dom/server";

import { QrCard } from "~/shared/components/qr-card";
import { fetchImageAsBase64, resolveQueryParams } from "~/server/utils";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "GET" && req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const params = resolveQueryParams(req);
  let logo = params.logo;

  if (req.method === "POST") {
    const bodyParams = (await req.json()) as { logo: string };
    logo = decodeURIComponent(bodyParams.logo) || logo; // Override logo if provided in body
  }

  // Fetch base64 logo if the logo is a URL
  if (logo && !logo.startsWith("data")) {
    logo = (await fetchImageAsBase64(logo)) as string;
  }

  const card = (
    <QrCard
      data={params.data}
      size={params.size}
      bgColor={params.bgColor}
      fgColor={params.fgColor}
      cr={params.cr}
      title={params.title}
      logo={logo}
    />
  );

  const markup = renderToStaticMarkup(card);
  const filename = `qrgo_${Date.now()}.svg`;

  return new Response(markup, {
    headers: {
      "Content-Type": "image/svg+xml",
      ...(params.download === "true"
        ? { "Content-Disposition": `attachment; filename="${filename}"` }
        : {}),
    },
  });
}
