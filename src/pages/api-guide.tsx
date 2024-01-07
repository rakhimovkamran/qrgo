import { Meta } from "~/shared/components/meta";
import { Footer } from "~/shared/components/footer";

const QueryParameters = [
  {
    title: "as",
    type: "svg | png",
    description: `Response format. Default is "svg".`,
  },

  {
    title: "data",
    type: "string",
    description: "The data to be encoded in the QR code. Required.",
  },

  {
    title: "s",
    type: "number",
    description:
      "The size of the QR code in pixels (Min: 100, Max: 1000). Default is 200.",
  },

  {
    title: "bg",
    type: "string",
    description:
      "Background color of the QR code in hexadecimal format. Default is `#000000`",
  },

  {
    title: "fg",
    type: "string",
    description:
      "Foreground color of the QR code in hexadecimal format. Default is `#FFFFFF`",
  },

  {
    title: "cr",
    type: "number",
    description:
      "The corner radius of the QR code (Min: 0, Max: 15). Default is 10.",
  },

  {
    title: "title",
    type: "string",
    description: "A title for the QR code. Default is an empty string.",
  },

  {
    title: "logo",
    type: "string",
    description:
      "URL of the logo to be included in the center of the QR code. Supports .jpg, .png extensions. Default is an empty string.",
  },

  {
    title: "download",
    type: "string",
    description:
      'If set to `"true"`, the response will include headers to prompt a file download with a generated filename. Default is an empty string.',
  },
];

const QueryParameter = ({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type: string;
}) => {
  return (
    <li>
      <pre>
        <strong>&quot;{title}&quot;</strong> ({type})
      </pre>
      <p className={"text-muted-foreground"}>{description}</p>
    </li>
  );
};

export default function ApiGuide() {
  return (
    <>
      <Meta
        title={"Qrgo API Guide"}
        description={"Get your minimalistic QR."}
      />

      <div
        className={"squared-pattern absolute left-0 top-0 z-0 h-[400px] w-full"}
      />

      <main className={"relative z-30 mx-auto max-w-xl px-4 pb-10 pt-20"}>
        <header className={"z-20 flex flex-col gap-4"}>
          <h1 className={"text-3xl font-bold"}>Qrgo API</h1>
          <p className={"text-sm font-light text-muted-foreground"}>
            This API generates QR codes with customizable parameters. It returns
            an image of the QR code based on the provided query parameters.
          </p>
        </header>

        <section className={"mt-10 flex flex-col"}>
          <h2 className={"text-xl font-semibold"}>Endpoint</h2>

          <div className={"mt-4 flex flex-col gap-2"}>
            <code className="relative rounded bg-muted p-2 font-mono text-sm font-semibold">
              <span className={"text-blue-600"}>GET</span> /api/qr
            </code>

            <p className={"text-sm font-light text-muted-foreground"}>
              Generates a QR code based on the provided query parameters.
            </p>
          </div>
        </section>

        <section className={"mt-8 flex flex-col"}>
          <h2 className={"text-xl font-semibold"}>Query Parameters</h2>

          <div className={"mt-2 flex flex-col gap-2 text-sm"}>
            <ul className="ml-6 list-disc [&>li]:mt-4">
              {QueryParameters.map((param) => (
                <QueryParameter key={param.title} {...param} />
              ))}
            </ul>
          </div>
        </section>

        <section className={"mt-8 flex flex-col"}>
          <h2 className={"text-xl font-semibold"}>Example Request</h2>

          <code className="relative mt-3 break-words rounded bg-muted p-2 font-mono text-sm font-semibold">
            <span className={"text-blue-600"}>GET</span>{" "}
            /api/qr?data=https://example.com&bg=%23000&fg=%23fff&title=Example&logo=https://placehold.co/120x120/FFF/000/png&cr=5
          </code>

          <div className={"mt-2 flex flex-col gap-3 text-sm"}>
            <p className={"text-muted-foreground"}>
              This request will generate a QR code with the specified
              parameters, where:
            </p>

            <ul className={"ml-6 list-disc [&>li]:mt-2"}>
              <li>
                <strong>`data`</strong> is set to
                &apos;https://example.com&apos;
              </li>
              <li>
                <strong>`bg`</strong> (background color) is{" "}
                <span className={"font-semibold uppercase"}>#000</span>
              </li>
              <li>
                <strong>`fg`</strong> (foreground color) is{" "}
                <span className={"font-semibold uppercase"}>#FFF</span>
              </li>
              <li>
                <strong>`title`</strong> is &apos;Example&apos;
              </li>
              <li>
                <strong>`logo`</strong> url is{" "}
                <a
                  target={"_blank"}
                  href={"https://placehold.co/120x120/FFF/000/png"}
                  className={"font-medium hover:underline"}
                >
                  https://placehold.co/120x120/FFF/000/png
                </a>
              </li>
              <li>
                <strong>`cr`</strong> (corner radius) is 5
              </li>
            </ul>
          </div>

          <img
            alt={"Example QR Code"}
            className={"mt-5"}
            src={
              "/api/qr?data=https://example.com&s=100&bg=%23000&fg=%23fff&title=Example&logo=https://placehold.co/120x120/FFF/000/png&cr=5"
            }
          />
        </section>

        <section className={"mt-8 flex flex-col"}>
          <h2 className={"text-xl font-semibold"}>Notes</h2>

          <div className={"mt-2 flex flex-col gap-2 text-sm"}>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              <li>Ensure that URL parameters are properly encoded.</li>
              <li>
                The size, background and foreground colors, and corner radius
                can greatly affect the visibility and scan-ability of the QR
                code. Test different configurations for best results.
              </li>
              <li>Enjoy the service 😉</li>
            </ul>
          </div>
        </section>

        <Footer
          links={[
            { label: "GitHub", href: "https://github.com/rakhimovkamran/qrgo" },
            { label: "Home", href: "/" },
          ]}
        />
      </main>
    </>
  );
}
