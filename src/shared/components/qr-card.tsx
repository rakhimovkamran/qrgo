import QRCodeSvg from "qrcode-svg";
import { motion } from "framer-motion";
import { useMemo } from "react";

import { getPercentage } from "~/shared/utils";

export const PADDING_FACTOR = 0.4;
export const LOGO_SIZE_FACTOR = 25;

type GenerateQRCodeParams = {
  data: string;
  size: number;
  color: string;
  container?: "none" | "svg";
};

export const generateQRCode = ({
  data,
  size,
  color,
  container = "none",
}: GenerateQRCodeParams) => {
  return new QRCodeSvg({
    background: "transparent",
    content: data,
    height: size,
    width: size,
    padding: 0,
    ecl: "H",
    join: true,
    color,
  }).svg({ container });
};

type CalculateSizesParams = {
  size: number;
  title: string;
};

export const calculateSizes = ({ size, title }: CalculateSizesParams) => {
  const padding = size * PADDING_FACTOR;
  const additionalSpace = title ? (size + padding) / 10 : 0;

  return {
    height: size + padding + additionalSpace,
    width: size + padding,

    padding,

    logoConfig: {
      wrapperSize: (size * LOGO_SIZE_FACTOR) / 100,
      position: (size + padding) / 2 - (size * LOGO_SIZE_FACTOR) / 100 / 2,
      imageSize: ((size * LOGO_SIZE_FACTOR) / 100) * 0.7,
    },

    titleConfig: {
      marginTop: (size + padding) / 15,
      offset: (size + padding) / 10,
      size: (size + padding) / 13,
    },
  };
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
    return calculateSizes({ size, title: title ?? "" });
  }, [size, title]);

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
