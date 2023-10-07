"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useTransition } from "react";
import LanDic from "../LanDic";
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const locales = ["en", "fr", "es", "zh_tw", "zh_cn", "pl", "de", "pt", "ja"];
  //   const locales = [
  //     "en",
  //     "fr",
  //     "es",
  //     "zh_tw",
  //     "zh_cn",
  //     "pl",
  //     "de",
  //     "pt",
  //     "ja",
  //     "af",
  //     "ar",
  //     "bg",
  //     "bn",
  //     "ca",
  //     "cs",
  //     "da",
  //     "el",
  //     "eo",
  //     "et",
  //     "fa",
  //     "fi",
  //     "he",
  //     "hi",
  //     "hu",
  //     "id",
  //     "it",
  //     "kk",
  //     "ko",
  //     "lt",
  //     "lv",
  //     "mk",
  //     "nl",
  //     "no",
  //     "ro",
  //     "ru",
  //     "sk",
  //     "sl",
  //     "sq",
  //     "sr",
  //     "sv",
  //     "th",
  //     "tr",
  //     "uk",
  //     "vi",
  //   ];

  function onSelectChange(event) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <li className="nav-item">
      <select
        className="form-select"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {locales.map((cur) => (
          <option key={cur} value={cur}>
            {LanDic[cur].native_language}
          </option>
        ))}
      </select>
    </li>

    // <li className="nav-item dropdown">
    //   <a
    //     className="nav-link dropdown-toggle"
    //     role="button"
    //     data-bs-toggle="dropdown"
    //     aria-expanded="false"
    //   >
    //     <i className="bi bi-globe"></i>
    //     {LanDic[locale].native_language}
    //   </a>
    //   <ul className="dropdown-menu dropdown-menu-end scrollable-menu">
    //     {locales.map((locale) => {
    //       return (
    //         <li
    //           key={locale}
    //           value={locale}
    //           onClick={onSelectChange}
    //           className="dropdown-item"
    //         >
    //           <i className="flag-united-kingdom flag" />
    //           {LanDic[locale].native_language}
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </li>
  );
}
