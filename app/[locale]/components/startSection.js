"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import LanDic from "../LanDic";
import { useLocale } from "next-intl";

export default function StartSection() {
  let locale = useLocale();
  const [book, setBook] = useState();
  const [button, setButton] = useState();
  const [strict, setStrict] = useState();
  let bookPool = [];
  let history = [];
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setButton(
      <button
        className="btn btn-lg btn-danger btn-rounded"
        onClick={() => handleBookRequest(LanDic[locale].language)}
      >
        {LanDic[locale].start_button}
      </button>
    );
    bookPool = [];
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    // handleBookRequest(LanDic[locale].language);
  }, [LanDic[locale].language]);

  useEffect(() => {
    setButton(
      <button
        className="btn btn-lg btn-danger btn-rounded"
        onClick={() => handleBookRequest(LanDic[locale].language)}
      >
        {LanDic[locale].start_button}
      </button>
    );
  }, [strict]);

  async function handleBookRequest(lan) {
    setButton(
      <button
        className="btn btn-lg btn-danger btn-rounded"
        type="button"
        disabled
      >
        <span
          className="spinner-grow spinner-grow-sm"
          aria-hidden="true"
        ></span>
        <span role="status"> {LanDic[locale].coming_button}</span>
      </button>
    );

    if (bookPool.length < 380) {
      let language = { language: lan, locale: locale, strict: strict };
      console.log(language);
      let result = "";
      let response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(language),
      });

      result = await response.json();
      while (result.requestAgain === true) {
        response = await fetch("/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(language),
        });
        result = await response.json();
      }
      if (result.error !== undefined) {
        console.log("alert test point");
        let error_message = "";
        if (result.error === "server") {
          error_message = LanDic[locale].server_error;
        }
        if (result.error === "limit") {
          error_message = LanDic[locale].limit_error;
        }
        MySwal.fire("Oops!", `${error_message}`, "error").then(() => {
          setButton(
            <button
              className="btn btn-lg btn-danger btn-rounded"
              onClick={() => handleBookRequest(LanDic[locale].language)}
            >
              {LanDic[locale].start_button}
            </button>
          );
        });
        return;
      }
      const totalBooks = result.items.length;
      // console.log(`result length${totalBooks}`);

      // Generate a random index within the range of available English books
      const randomIndex = Math.floor(Math.random() * totalBooks);

      // Retrieve the randomly selected English book
      const randomBook = result.items[randomIndex];

      // Extract relevant information from the book object
      if (randomBook.volumeInfo.imageLinks !== undefined) {
        randomBook.volumeInfo.imageLinks.thumbnail =
          randomBook.volumeInfo.imageLinks.thumbnail.replace(
            "zoom=1",
            "zoom=4"
          );
        if (
          randomBook.volumeInfo.imageLinks.thumbnail.includes("https") === false
        ) {
          randomBook.volumeInfo.imageLinks.thumbnail =
            randomBook.volumeInfo.imageLinks.thumbnail.replace("http", "https");
        }
      }

      let authors = "";
      if (randomBook.volumeInfo.authors !== undefined) {
        for (let i = 0; i < randomBook.volumeInfo.authors.length; i++) {
          const author = randomBook.volumeInfo.authors[i];
          if (randomBook.volumeInfo.authors.length > 1) {
            authors += author + " | ";
          } else {
            authors += author + " ";
          }
        }
        randomBook.volumeInfo.authors = authors;
      }

      console.log(randomBook);
      result.items.splice(randomIndex, 1);
      bookPool.push(...result.items);
      history.push(randomBook);
      setBook(randomBook);
      setButton(
        <button
          className="btn btn-lg btn-danger btn-rounded"
          onClick={() => handleBookRequest(LanDic[locale].language)}
        >
          {LanDic[locale].start_button}
        </button>
      );
    } else {
      setTimeout(() => {
        const totalBooks = bookPool.length;

        console.log(`bookpool length${totalBooks} point1`);

        // Generate a random index within the range of available English books
        const randomIndex = Math.floor(Math.random() * totalBooks);

        // Retrieve the randomly selected English book
        const randomBook = bookPool[randomIndex];

        // Extract relevant information from the book object
        if (randomBook.volumeInfo.imageLinks !== undefined) {
          randomBook.volumeInfo.imageLinks.thumbnail =
            randomBook.volumeInfo.imageLinks.thumbnail.replace(
              "zoom=1",
              "zoom=4"
            );
          if (
            randomBook.volumeInfo.imageLinks.thumbnail.includes("https") ===
            false
          ) {
            randomBook.volumeInfo.imageLinks.thumbnail =
              randomBook.volumeInfo.imageLinks.thumbnail.replace(
                "http",
                "https"
              );
          }
        }

        let authors = "";
        if (randomBook.volumeInfo.authors !== undefined) {
          for (let i = 0; i < randomBook.volumeInfo.authors.length; i++) {
            const author = randomBook.volumeInfo.authors[i];
            if (randomBook.volumeInfo.authors.length > 1) {
              authors += author + " | ";
            } else {
              authors += author + " ";
            }
          }
          randomBook.volumeInfo.authors = authors;
        }

        console.log(randomBook);
        bookPool.splice(randomIndex, 1);
        history.push(randomBook);
        setBook(randomBook);
        setButton(
          <button
            className="btn btn-lg btn-danger btn-rounded"
            onClick={() => handleBookRequest(LanDic[locale].language)}
          >
            {LanDic[locale].start_button}
          </button>
        );
      }, 1500);
    }
    // console.log(`bookpool length${bookPool.length} point2`);
    // console.log(history);
    // console.log(bookPool);
  }

  return (
    <div className="start-section">
      <div>
        {button}{" "}
        <div className="form-check pt-1 d-flex justify-content-center">
          <input
            className="form-check-input me-1"
            type="checkbox"
            id="wildCheckbox"
            value="wildCheckbox"
            onClick={(e) => setStrict(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="wildCheckbox">
            Strict Mode
          </label>
          <i
            className="bi bi-info-square ms-1 me-1 info-square "
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-bs-title="Only Books"
          ></i>
        </div>
      </div>

      <br />

      {book !== undefined ? (
        <div className="content-display ">
          <h2 className="pt-2">{book.volumeInfo.title}</h2>
          <h3>{book.volumeInfo.subtitle}</h3>
          <h4>
            {LanDic[locale].author} {book.volumeInfo.authors}
          </h4>
          <span>
            {LanDic[locale].publisher}: {book.volumeInfo.publisher}{" "}
          </span>
          <span>
            | {LanDic[locale].publish_date}: {book.volumeInfo.publishedDate}
          </span>
          <br />
          <br />
          <div className="content-details row">
            <div className="book-cover col-md-6 ">
              <img
                className="book-cover-img"
                src={
                  book.volumeInfo.imageLinks !== undefined
                    ? book.volumeInfo.imageLinks.thumbnail
                    : "/img-not-available.png"
                }
                alt="book-cover"
              />
            </div>

            <div className="book-detail col-md-6">
              <h4>{LanDic[locale].book_description}:</h4>

              <div>
                <p className="book-description">
                  {book.volumeInfo.description}
                </p>
              </div>
              <br />
              <h4>{LanDic[locale].text_snippet}:</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    book.searchInfo !== undefined
                      ? book.searchInfo.textSnippet.replace(/<b>|<\/b>/g, "")
                      : null,
                }}
                className="text-snippet"
              ></p>
            </div>
            <br />
          </div>
          <div>
            <p className=" mt-3 pb-2">
              {LanDic[locale].question_text}?
              <a
                href={book.volumeInfo.infoLink}
                target="_blank"
                rel="noreferrer"
              >
                <span> {LanDic[locale].click_text} </span>
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
