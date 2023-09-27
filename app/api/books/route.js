/* eslint-disable */
import lanDic from "./lanDic.js";
import { NextResponse } from "next/server.js";
import { getWordsList } from "most-common-words-by-language";

// const { getWordsList } = require("most-common-words-by-language");
// eslint-disable-next-line require-jsdoc
function generateRandomWords(lan) {
  // based on the input language to create random words.

  let wordsList = [];
  if (lan === "繁體中文") {
    wordsList = lanDic[lan].slice();
  } else {
    // wordsList = getWordsList(lan.toLowerCase());
    wordsList = lanDic["English"].slice();
  }
  console.log(wordsList);
  const maxWords = 3;

  let randomWords = "";
  const wordsCount = Math.floor(Math.random() * maxWords + 1);

  for (let i = 0; i < wordsCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const randomWord = wordsList[randomIndex];
    randomWords += randomWord + " ";
  }

  return randomWords;
}

// eslint-disable-next-line require-jsdoc
function getBooks(clientIP, url, callback) {
  fetch(
    {
      url: url,
      headers: {
        "X-Forwarded-For": clientIP,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log("api server error test point");
        console.error(error);
        callback("server_error");
      } else {
        // Handle the response from the external API
        const data = JSON.parse(body);
        // console.log(data);
        if (data.error !== undefined) {
          console.log("limit error test point");
          console.log(data);
          callback("error");
        } else {
          if (data.items !== undefined) {
            console.log(data.items.length);
            callback(data);
          } else {
            console.log("redirect test point1");
            callback("redirect");
          }
        }
      }
    }
  );
}

export async function POST(request) {
  console.log("books test point");
  const data = await request.json();
  console.log(data);
  const language = data.language;
  const clientIP = request.headers["x-forwarded-for"];
  const noEncodedwords = generateRandomWords(language);
  const randomWords = encodeURI(noEncodedwords);
  const publicUrl = `https://www.googleapis.com/books/v1/volumes?q=${randomWords}&maxResults=40`;
  const apiKeyUrl = `https://www.googleapis.com/books/v1/volumes?q=${randomWords}&maxResults=40&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  // Make API call to external API
  const res = await fetch(publicUrl, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.GOOGLE_BOOKS_API_KEY,
    },
  });
  const result = await res.json();

  return NextResponse.json(result);
}

//   getBooks(clientIP, publicUrl, (result) => {
//     if (result === "server_error") {
//       return NextResponse.json({ error: "server" });
//     }
//     if (result === "error") {
//       getBooks(clientIP, apiKeyUrl, (secondResult) => {
//         if (secondResult === "error") {
//           return NextResponse.json({ error: "limit" });
//         } else if (secondResult === "redirect") {
//           console.log("Redirecting...");
//           return NextResponse.json({ requestAgain: true });
//         } else {
//           return NextResponse.json(secondResult);
//         }
//       });
//     } else if (result === "redirect") {
//       console.log("Redirecting...");
//       return NextResponse.json({ requestAgain: true });
//     } else {
//       return NextResponse.json(result);
//     }
//   });
//   console.log(noEncodedwords);
// }
// export async function POST(request) {
//   let data = await request.json();
//   console.log("post text point");
//   console.log(data);
//   return NextResponse.json({ error: "server" });
// }
