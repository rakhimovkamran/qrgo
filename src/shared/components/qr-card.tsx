import QRCodeSvg from "qrcode-svg";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { getPercentage } from "~/shared/utils";

export const PADDING_FACTOR = 0.4;

type GenerateQRCodeParams = {
  data: string;
  size: number;
  color: string;
};

const generateQRCode = ({ data, size, color }: GenerateQRCodeParams) => {
  return new QRCodeSvg({
    background: "transparent",
    content: data,
    height: size,
    width: size,
    padding: 0,
    ecl: "H",
    pretty: true,
    predefined: true,
    color,
  }).svg({ container: "none" });
};

type CalculateCardSizeParams = {
  size: number;
  title: string;
};

export const calculateCardSize = ({ size, title }: CalculateCardSizeParams) => {
  const padding = size * PADDING_FACTOR;
  const additionalSpace = title ? (size + padding) / 10 : 0;
  return { width: size + padding, height: size + padding + additionalSpace };
};

type QrCardProps = {
  data: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  cr?: number;
  logo?: string;
  title?: string;
};

export const QrCard = ({
  data,
  size = 200,
  bgColor = "#000000",
  fgColor = "#FFFFFF",
  cr = 0,
  logo,
  title,
}: QrCardProps) => {
  const { padding, logoConfig, titleConfig } = useMemo(() => {
    const pad = size * PADDING_FACTOR;
    const logoSizeFactor = 25;

    return {
      padding: pad,

      logoConfig: {
        wrapperSize: (size * logoSizeFactor) / 100,
        position: (size + pad) / 2 - (size * logoSizeFactor) / 100 / 2,
        imageSize: ((size * logoSizeFactor) / 100) * 0.7,
      },

      titleConfig: {
        offset: (size + pad) / 10,
        size: (size + pad) / 13,
      },
    };
  }, [size]);

  return (
    <motion.svg
      viewBox={`0 0 ${size + padding} ${
        size + padding + (title ? titleConfig.offset : 0)
      }`}
      height={size + padding + (title ? titleConfig.offset : 0)}
      width={size + padding}
      xmlns="http://www.w3.org/2000/svg"
      animate={{
        height: size + padding + (title ? titleConfig.offset : 0),
        viewBox: `0 0 ${size + padding} ${
          size + padding + (title ? titleConfig.offset : 0)
        }`,
      }}
    >
      <motion.rect
        height={size + padding + (title ? titleConfig.offset : 0)}
        width={size + padding}
        rx={getPercentage(cr, size + padding)}
        ry={getPercentage(cr, size + padding)}
        fill={bgColor}
        animate={{ height: size + padding + (title ? titleConfig.offset : 0) }}
      />

      <motion.g
        dangerouslySetInnerHTML={{
          __html: generateQRCode({ color: fgColor, data, size }),
        }}
        animate={{
          translateX: padding / 2,
          translateY: padding / 2 + (title ? titleConfig.offset : 0),
        }}
        initial={{
          translateX: padding / 2,
          translateY: padding / 2 + (title ? titleConfig.offset : 0),
        }}
        transform={`translate(${padding / 2}, ${
          padding / 2 + (title ? titleConfig.offset : 0)
        })`}
        width={size}
        height={size}
      />

      {title && (
        <motion.text
          x={"50%"}
          y={"12%"}
          fill={fgColor}
          fontFamily={`sans-serif`}
          fontWeight={"bold"}
          fontSize={titleConfig.size}
          textAnchor={"middle"}
          alignmentBaseline={"central"}
          dominantBaseline={"central"}
        >
          {title}
        </motion.text>
      )}

      {logo && (
        <motion.g
          transform={`translate(${logoConfig.position}, ${
            logoConfig.position + (title ? titleConfig.offset : 0)
          })`}
          animate={{
            translateX: logoConfig.position,
            translateY: logoConfig.position + (title ? titleConfig.offset : 0),
          }}
          initial={{
            translateX: logoConfig.position,
            translateY: logoConfig.position + (title ? titleConfig.offset : 0),
          }}
          width={logoConfig.wrapperSize}
          height={logoConfig.wrapperSize}
          alignmentBaseline="central"
          dominantBaseline="central"
        >
          <motion.rect
            height={logoConfig.wrapperSize}
            width={logoConfig.wrapperSize}
            rx={getPercentage(5, logoConfig.wrapperSize)}
            ry={getPercentage(5, logoConfig.wrapperSize)}
            fill={bgColor}
          />

          <motion.image
            x={(logoConfig.wrapperSize - logoConfig.imageSize) / 2}
            y={(logoConfig.wrapperSize - logoConfig.imageSize) / 2}
            height={logoConfig.imageSize}
            width={logoConfig.imageSize}
            crossOrigin="anonymous"
            href={`${logo}`}
          />
        </motion.g>
      )}
    </motion.svg>
  );
};
