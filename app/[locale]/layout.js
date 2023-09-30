import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { notFound } from "next/navigation";
import LanDic from "./LanDic";
import Script from "next/script";

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
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
        />
        <Script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${process.env.GA_KEY}');`}</Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5689225684612617"
          crossOrigin="anonymous"
        />
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
