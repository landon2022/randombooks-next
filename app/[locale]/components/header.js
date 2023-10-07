"use client";
import Link from "next-intl/link";
import LanDic from "../LanDic";
import { useLocale } from "next-intl";
import LangSwitcher from "./langSwitcher";
import LocaleSwitcher from "./localeSwitcher";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Layout() {
  let locale = useLocale();

  function setActive(e) {
    var element = document.querySelector(".active");
    element.classList.remove("active");
    e.target.classList.add("active");
  }

  return (
    <nav
      className="navbar navbar-expand-md navbar-secondary bg-light fixed-top"
      aria-label="Offcanvas navbar large"
    >
      <div className="container-fluid ms-2 nav-container">
        <Link
          href="/"
          className="navbar-brand "
          // onClick={() => setCurrentPath("")}
        >
          <img
            src="/flogo.gif"
            alt="Logo"
            width="32"
            height="28"
            className="d-inline-block align-text-top  me-1 "
          />
          <span className="brand-text">{LanDic[locale].brand}</span>
        </Link>
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar2"
          aria-controls="offcanvasNavbar2"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-transparent"
          tabIndex={-1}
          id="offcanvasNavbar2"
          aria-labelledby="offcanvasNavbar2Label"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
              {" "}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-grey"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body" id="navbar-links">
            <ul className="navbar-nav justify-content-end me-2 flex-grow-1 transparent">
              <li className="nav-item">
                <Link
                  href="/"
                  className="nav-link active"
                  onClick={(e) => {
                    // setCurrentPath("");
                    setActive(e);
                  }}
                >
                  {LanDic[locale].home}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/faqs"
                  className="nav-link "
                  onClick={(e) => {
                    // setCurrentPath("faqs");
                    setActive(e);
                  }}
                >
                  {LanDic[locale].FAQ}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link"
                  onClick={(e) => {
                    // setCurrentPath("contact");
                    setActive(e);
                  }}
                >
                  {LanDic[locale].contact}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className="nav-link"
                  onClick={(e) => {
                    // setCurrentPath("about");
                    setActive(e);
                  }}
                >
                  {LanDic[locale].about}
                </Link>
              </li>

              <LangSwitcher />
              {/* <LocaleSwitcher /> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
