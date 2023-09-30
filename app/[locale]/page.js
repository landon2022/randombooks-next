import StartSection from "./components/startSection";
import LanDic from "./LanDic";
import { useLocale } from "next-intl";

export default function Index() {
  let locale = useLocale();
  return (
    <>
      <div className="container">
        <div className="main-container">
          <div className="content-container">
            <br />
            <br />
            <div className="action-zone">
              <br />
              <h1
                className="slogan"
                dangerouslySetInnerHTML={{ __html: LanDic[locale].home_slogan }}
              ></h1>

              <hr />
              <br />

              <p
                dangerouslySetInnerHTML={{
                  __html: LanDic[locale].home_slogan_p,
                }}
              ></p>

              <StartSection />
              <br />
            </div>
            <br />
            <div
              className="explanation"
              dangerouslySetInnerHTML={{
                __html: LanDic[locale].home_explanation,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
