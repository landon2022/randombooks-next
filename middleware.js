import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: [
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
  ],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
