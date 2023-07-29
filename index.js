import blue from "@atproto/api";
// import fs from "node:fs";
import getRandomJoke from "./data_from_api.js";
import dotenv from 'dotenv';

dotenv.config();

const { BskyAgent } = blue;

const BLUESKY_BOT_USERNAME = process.env.BLUESKY_BOT_USERNAME;
const BLUESKY_BOT_PASSWORD = process.env.BLUESKY_BOT_PASSWORD;

const fileName = "./post.json";

const generateFunnyCatQuote = async () => {
  const joke = await getRandomJoke();
  const fileContent = { body: `Time for Joke: \n- ${joke.setup} \n- ${joke.punchline}` }

  // Post using the joke
  const { RichText } = blue;
  const agent = new BskyAgent({ service: "https://bsky.social/" });
  await agent.login({
    identifier: BLUESKY_BOT_USERNAME,
    password: BLUESKY_BOT_PASSWORD,
  });
  const rt = new RichText({ text: fileContent.body });
  const postRecord = {
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };
  await agent.post(postRecord);
};

generateFunnyCatQuote();
