import { type AppType } from "next/dist/shared/lib/utils";
import { GeistSans } from "geist/font/sans";
import "~/assets/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={GeistSans.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
