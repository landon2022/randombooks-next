import LanDic from "../LanDic";

import { useLocale } from "next-intl";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: "Bookshelf",
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
          <h2>Bookshelf</h2>
          <div className="universal-description">This is a Bookshelf.</div>
        </main>
      </div>
    </div>
  );
}
