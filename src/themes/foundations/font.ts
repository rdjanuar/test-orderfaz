import localFont from "next/font/local";

const sfFont = localFont({
  src: [
    {
      path: "../../../public/fonts/regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const fonts = {
  heading: sfFont.style.fontFamily,
  body: sfFont.style.fontFamily,
};
