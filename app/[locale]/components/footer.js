"use client";

import Link from "next/link";
import LanDic from "../LanDic";
import { useLocale } from "next-intl";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Footer() {
  let locale = useLocale();
  const year = new Date().getFullYear();
  const [button, setButton] = useState(
    <button className="btn btn-secondary" type="submit">
      {LanDic[locale].subscribe_button}
    </button>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setButton(
      <button className="btn btn-secondary " type="submit" disabled>
        {" "}
        <span
          className="spinner-grow spinner-grow-sm "
          aria-hidden="true"
        ></span>
        <span role="status"> {LanDic[locale].subscribe_button}</span>
      </button>
    );
    // Get the email address from the form.
    const email = event.target.elements.email_input.value;
    console.log(email);
    // TODO: Implement this function.
    // subscribeToNewsletter(email);
    let data = { email: email };

    let response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result = await response.json();
    if (result.status === "success") {
      event.target.elements.email_input.value = "";
      setButton(
        <button className="btn btn-secondary " type="submit">
          {LanDic[locale].subscribe_button}
        </button>
      );

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
      });

      Toast.fire({
        icon: "success",
        title: "Thank you for subscribing",
      });
    }
    if (result.status === "error") {
      setButton(
        <button className="btn btn-secondary " type="submit">
          {LanDic[locale].subscribe_button}
        </button>
      );
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
      });

      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="footer-container d-flex">
      <div className="container">
        <footer className="pt-4">
          <div className="row">
            <div className="col-6 col-md-2 mb-0 ">
              <h4>{LanDic[locale].navigation}</h4>
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
            <div className="col-6 col-md-2 ">
              <h4>{LanDic[locale].social_contacts}</h4>
              <ul className="list-unstyled d-flex">
                <li className="ms-3 icon">
                  <a
                    className="text-muted"
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/fancytravel2000"
                  >
                    <i aria-hidden className="social-icon fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-5 offset-md-1 mb-3 ms-auto">
              <form onSubmit={handleSubmit}>
                <h4>{LanDic[locale].subscribe_h5}</h4>
                <p>{LanDic[locale].subscribe_p}</p>
                <div className="row">
                  <div className="col-7 pe-0">
                    <label htmlFor="email_input" className="visually-hidden ">
                      {LanDic[locale].contact_email}
                    </label>
                    <input
                      id="email_input"
                      type="email"
                      className="form-control "
                      placeholder={LanDic[locale].contact_email}
                      required
                    />
                  </div>
                  <div className="col-5 ps-2">{button}</div>
                </div>
              </form>
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
