/* eslint-disable */
import lanDic from "./lanDic.js";
import { NextResponse } from "next/server.js";

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

async function connectDB() {
  client.connect();
  console.log("Connected correctly to server");
}
connectDB();

function generateRandomWords(lan) {
  // based on the input language to create random words.
  console.log("randomword test point");
  let wordsList = lanDic[lan.toLowerCase()].slice();
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
  // console.log(request);
  const data = await request.json();
  console.log(data);
  const language = data.language;
  const clientIP = request.headers["x-forwarded-for"];
  console.log(clientIP);
  const noEncodedwords = generateRandomWords(language);
  const randomWords = encodeURI(noEncodedwords);
  const publicUrl = `https://www.googleapis.com/books/v1/volumes?q=${randomWords}&maxResults=40`;
  const apiKeyUrl = `https://www.googleapis.com/books/v1/volumes?q=${randomWords}&maxResults=40&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  // Make API call to external API
  let result = {};
  try {
    const res = await fetch(publicUrl);

    result = await res.json();
    if (result.error !== undefined) {
      let res = await fetch(apiKeyUrl);
      result = await res.json();
      if (result.error !== undefined) {
        const booksFromDB = await client
          .db("randombooks")
          .collection(language)
          .aggregate([
            {
              $sample: {
                size: 100,
              },
            },
          ])
          .toArray();
        if (booksFromDB.length > 0) {
          result.items = booksFromDB;
          return NextResponse.json(result);
        } else {
          return NextResponse.json({ error: "limit" });
        }
      }
    }
    if (result.items !== undefined) {
      // let data = result.items.map((item) => ({
      //   volumeInfo: item.volumeInfo,
      //   searchInfo: item.searchInfo,
      // }));
      try {
        await client
          .db("randombooks")
          .collection(language)
          .insertMany(result.items);
        return NextResponse.json(result);
      } catch (error) {
        return NextResponse.json(result);
      }
    } else {
      return NextResponse.json({ requestAgain: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "server" });
  }
}
