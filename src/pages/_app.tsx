import { type AppType } from "next/dist/shared/lib/utils";
import { GeistSans } from "geist/font/sans";

import "~/assets/styles/globals.css";
import { cn } from "~/shared/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      vaul-drawer-wrapper=""
      className={cn(
        GeistSans.className,
        "min-h-[100vh] bg-background antialiased",
      )}
    >
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
