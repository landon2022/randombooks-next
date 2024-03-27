import { NextResponse } from "next/server.js";
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

async function connectDB() {
  client.connect();
  console.log("Connected correctly to server");
}
connectDB();

export async function POST(request) {
  console.log("subscribe test point");

  try {
    let data = await request.json();
    await client.db("randombooks").collection("subscribers").insertOne(data);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ status: "error", errorobj: error });
  }
}
