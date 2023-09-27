import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import LanDic from "./LanDic";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: LanDic[locale].html_title,
    description: LanDic[locale].html_mata_description,
  };
}

const locales = ["en", "fr", "es", "zh_tw", "zh_cn", "pl", "de", "pt", "ja"];

export default function LocaleLayout({ children, params: { locale } }) {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="flogo.gif" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.randombooks.xyz"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://www.randombooks.xyz/fr"
        />
        <link
          rel="alternate"
          hrefLang="es"
          href="https://www.randombooks.xyz/es"
        />
        <link
          rel="alternate"
          hrefLang="zh_tw"
          href="https://www.randombooks.xyz/zh_tw"
        />
        <link
          rel="alternate"
          hrefLang="zh_cn"
          href="https://www.randombooks.xyz/zh_cn"
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href="https://www.randombooks.xyz/pl"
        />
        <link
          rel="alternate"
          hrefLang="de"
          href="https://www.randombooks.xyz/de"
        />
        <link
          rel="alternate"
          hrefLang="pt"
          href="https://www.randombooks.xyz/pt"
        />
        <link
          rel="alternate"
          hrefLang="ja"
          href="https://www.randombooks.xyz/ja"
        />
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
        <Footer />
      </body>
    </html>
  );
}
