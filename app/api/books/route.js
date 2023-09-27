/* eslint-disable */
import lanDic from "./lanDic.js";
import { NextResponse } from "next/server.js";
const { getWordsList } = require("most-common-words-by-language");
// const fs = require("fs");
// import { getWordsList } from "most-common-words-by-language";

// // const { getWordsList } = require("most-common-words-by-language");
// // eslint-disable-next-line require-jsdoc

// async function getWordsListFromTxtFile(searchInput) {
//   // Get the path to the txt file.
//   const filePath = `./resources/${searchInput}.txt`;

//   // Check if the txt file exists.
//   if (!fs.existsSync(filePath)) {
//     throw new Error(`The txt file ${filePath} does not exist.`);
//   }

//   // Load the txt file into a string.
//   const fileContent = await fs.promises.readFile(filePath, "utf8");

//   // Split the txt file into a list of strings.
//   const wordsList = fileContent.split(/\r?\n/);

//   // Return the list of strings.
//   return wordsList;
// }

function generateRandomWords(lan) {
  // based on the input language to create random words.
  console.log("randomword test point");
  // let spanish = getWordsList("spanish");
  // console.log(spanish);
  let wordsList = [];
  if (lan === "繁體中文") {
    wordsList = lanDic[lan].slice();
  } else {
    wordsList = getWordsList(lan.toLowerCase());
    // wordsList = lanDic["English"].slice();
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
