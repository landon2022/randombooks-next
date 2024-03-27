"use client";

import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import LanDic from "../LanDic";
import { useLocale } from "next-intl";

export default function LangSwitcher() {
  let locale = useLocale();
  const pathName = usePathname();
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
  // const locales = ["en", "fr", "es", "zh_tw", "zh_cn", "pl", "de", "pt", "ja"];

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-globe"></i>
        {LanDic[locale].native_language}
      </a>
      <ul className="dropdown-menu dropdown-menu-end scrollable-menu">
        {locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href="/" locale={locale} className="dropdown-item">
                <i className="flag-united-kingdom flag" />
                {LanDic[locale].native_language}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
