import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  links?: { label: string; href: string }[];
};

export const Footer = ({ links }: FooterProps) => {
  return (
    <footer
      className={
        "sticky bottom-0 mt-4 flex w-full items-center justify-between border-t border-t-zinc-100 bg-white py-6 text-[#171717]"
      }
    >
      <div className={"flex items-center gap-2"}>
        <Image
          alt={"Kamran's profile picture"}
          src={"/favicon.svg"}
          height={24}
          width={24}
        />

        <span className={"text-sm font-light"}>
          Made by{" "}
          <a
            target={"_blank"}
            className={"cursor-pointer font-medium hover:underline"}
            href={"https://rakhi.mov"}
          >
            Kamran.
          </a>
        </span>
      </div>

      <nav className={"flex items-center gap-2"}>
        {links?.map((link) => {
          if (link.href.startsWith("http")) {
            return (
              <a
                className={"cursor-pointer text-sm font-medium hover:underline"}
                target={"_blank"}
                key={link.href}
                href={link.href}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              className={"cursor-pointer text-sm font-medium hover:underline"}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};
