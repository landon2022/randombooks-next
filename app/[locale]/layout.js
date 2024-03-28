import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { notFound } from "next/navigation";
import LanDic from "./LanDic";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: LanDic[locale].html_title,
    description: LanDic[locale].html_mata_description,
  };
}

// const locales = ["en", "fr", "es", "zh_tw", "zh_cn", "pl", "de", "pt", "ja"];
const locales = [
  "en",
  "fr",
  "es",
  "tw",
  "cn",
  "pl",
  "de",
  "pt",
  "ja",
  "af",
  "ar",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "el",
  "eo",
  "et",
  "fa",
  "fi",
  "he",
  "hi",
  "hu",
  "id",
  "it",
  "kk",
  "ko",
  "lt",
  "lv",
  "mk",
  "nl",
  "no",
  "ro",
  "ru",
  "sk",
  "sl",
  "sq",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
];

export default function LocaleLayout({ children, params: { locale } }) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <head>
        {locales.map((locale) => {
          if (locale === "en") {
            return (
              <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href="https://www.randombooks.xyz"
              />
            );
          } else {
            return (
              <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href={`https://www.randombooks.xyz/${locale}`}
              />
            );
          }
        })}
        {/* <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
        /> */}
        {/* <Script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${process.env.GA_KEY}');`}</Script> */}
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary"></meta>
        <meta
          property="og:title"
          content="Random Books | Random Book Recommendation. A place to the information cocoon, find hidden gem and enjoy reading"
        />
        <meta
          property="og:description"
          content="Break the information cocoon and knowledge barrier by random book recommendation. Discover a wide selection of random books on our website. Explore various genres, authors, and topics. Find your next captivating read and dive into the world of literature.  Start your random book journey today!"
        />
        <meta property="og:image" content="https://i.ibb.co/RcNWYp3/icon.gif" />
        <link rel="shortcut icon" href="flogo.gif" />
        <link rel="icon" href="public/favicon_io/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <script
          src="https://kit.fontawesome.com/86508f9c8b.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <Header />
        {children}
        {/* <Analytics />
        <SpeedInsights /> */}
        <Footer />
      </body>
    </html>
  );
}
