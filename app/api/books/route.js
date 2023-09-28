/* eslint-disable */
import lanDic from "./lanDic.js";
import { NextResponse } from "next/server.js";

function generateRandomWords(lan) {
  // based on the input language to create random words.
  console.log("randomword test point");

  let wordsList = lanDic[lan.toLowerCase()].slice();

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
  let result = {};
  try {
    const res = await fetch(publicUrl);
    console.log(res);
    result = await res.json();
    if (result.error !== undefined) {
      let res = await fetch(apiKeyUrl);
      result = await res.json();
      if (result.error !== undefined) {
        return NextResponse.json({ error: "limit" });
      }
    }
    if (result.items !== undefined) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ requestAgain: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "server" });
  }
}
