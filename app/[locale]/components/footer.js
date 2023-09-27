import Link from "next/link";
import LanDic from "../LanDic";
import { useLocale } from "next-intl";

export default function Footer(props) {
  let locale = useLocale();
  const year = new Date().getFullYear();
  return (
    <div className="footer-container">
      <div className="container">
        <footer className="pt-4">
          <div className="row">
            <div className="col-6 col-md-2 mb-0 ">
              <h5>{LanDic[locale].navigation}</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2 ">
                  <Link href={"/"} className="nav-link p-0 text-muted  ">
                    {LanDic[locale].home}
                  </Link>
                </li>

                <li className="nav-item mb-2">
                  <Link href={"/faqs"} className="nav-link p-0 text-muted">
                    {LanDic[locale].FAQ}
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href={"/contact"} className="nav-link p-0 text-muted">
                    {LanDic[locale].contact}
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link href={"/about"} className="nav-link p-0 text-muted">
                    {LanDic[locale].about}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-2 offset-md-1 mb-0 ms-auto">
              <h5>{LanDic[locale].social_contacts}</h5>
              <ul className="list-unstyled d-flex">
                <li className="ms-3 icon">
                  <a
                    className="text-muted"
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/lc81117740"
                  >
                    <i aria-hidden className="social-icon fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="copyright ">
            <p>
              {LanDic[locale].copyright} © {year} {LanDic[locale].brand},{" "}
              {LanDic[locale].reserve_right}.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
