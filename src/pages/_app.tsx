import { type AppType } from "next/dist/shared/lib/utils";
import { GeistSans } from "geist/font/sans";

import "~/assets/styles/globals.css";
import { cn } from "~/shared/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={cn(GeistSans.className, "antialiased")}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
