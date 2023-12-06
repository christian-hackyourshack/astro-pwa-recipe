import { fetchJson } from "./fetch-json";

export async function getDadJoke() {
  try {
    const json = await fetchJson("https://icanhazdadjoke.com/");
    return json.joke as string;
  } catch (e) {
    return "No dad joke for you";
  }
}
