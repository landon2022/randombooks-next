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

              <p className="promotion">
                Two books that helped a lot in waking me up and I hope they can
                help you the same; one is for critical thinking <br /> -{" "}
                <a href="https://amzn.to/4aI2iLQ" target="_blank">
                  Asking the Right Questions{" "}
                  <img
                    src="https://assets-global.website-files.com/61cb87c1189790ed10f7936d/61cb87c11897908692f79605_btn-amazon.svg"
                    alt="Amazon button"
                    className="aff-image"
                  />
                </a>{" "}
                ; <br />
                another is for reading fast and efficient <br /> -{" "}
                <a href="https://amzn.to/3xocGdu" target="_blank">
                  How to Read a Book{" "}
                  <img
                    src="https://assets-global.website-files.com/61cb87c1189790ed10f7936d/61cb87c11897908692f79605_btn-amazon.svg"
                    alt="Amazon button"
                    className="aff-image"
                  />
                </a>
                .
              </p>
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
