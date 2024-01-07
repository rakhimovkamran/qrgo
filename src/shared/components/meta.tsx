import Head from "next/head";

type MetaProps = {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
};

export const Meta = ({
  title,
  description,
  imageUrl = "/cover.jpg",
  url = typeof window !== "undefined" ? window.location.href : "",
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};
