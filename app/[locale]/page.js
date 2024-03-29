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
                Ad: Two books that helped a lot in waking me up and I hope they
                can help you the same; one is for critical thinking <br /> -{" "}
                <a href="https://amzn.to/3xdwpfO" target="_blank">
                  Asking the Right Questions
                </a>
                ; <br />
                another is for reading fast and efficient <br /> -{" "}
                <a href="https://amzn.to/43CnCAn" target="_blank">
                  How to Read a Book
                </a>
                . <br />
                As an Amazon Associate I earn from qualifying purchases. But
                only do it when you think it is helpful.
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
