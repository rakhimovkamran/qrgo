import { type NextRequest } from "next/server";
import { renderToStaticMarkup } from "react-dom/server";

import {
  processLogo,
  resolveQueryParams,
  respondBasedOnType,
} from "~/server/utils";
import { QrCard } from "~/shared/components/qr-card";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "GET" && req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const params = resolveQueryParams(req);
  const logo = (await processLogo(req, params.logo)) as string;

  const card = <QrCard {...params} logo={logo} />;
  const markup = renderToStaticMarkup(card);

  return respondBasedOnType(params, markup, logo);
}
