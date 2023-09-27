import LanDic from "../LanDic";
import { useLocale } from "next-intl";
export default function FAQs() {
  let locale = useLocale();
  return (
    <div className="container">
      <div className="main-container">
        <main className="content-container">
          <br />
          <br />
          <h2>{LanDic[locale].FAQ}</h2>
          <div
            className="universal-description"
            dangerouslySetInnerHTML={{ __html: LanDic[locale].faq_content }}
          ></div>
        </main>
      </div>
    </div>
  );
}
