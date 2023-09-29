import LanDic from "../LanDic";

import { useLocale } from "next-intl";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: LanDic[locale].about,
  };
}

export default function About() {
  let locale = useLocale();
  return (
    <div className="container">
      <div className="main-container">
        <main className="content-container">
          <br />
          <br />
          <h2>{LanDic[locale].about}</h2>
          <div
            className="universal-description"
            dangerouslySetInnerHTML={{ __html: LanDic[locale].about_content }}
          ></div>
        </main>
      </div>
    </div>
  );
}
