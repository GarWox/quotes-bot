import axios from "axios";
import chalk from "chalk";
import { createInterface } from "readline";
import { readFile } from "fs/promises";

const data = await readFile("config.json", "utf-8");

const config = JSON.parse(data);

const API_KEY = config.apikey;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const categories = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communication",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];

function init() {
  rl.question(
    chalk.blueBright("\nEscoge una categoría: ") +
      chalk.yellow(`${categories.join(", ")}\n\n`),
    (category) => {
      if (!category) {
        console.log(
          chalk.magenta(
            "No introduciste una categoria. Tendrás una cita aleatoria"
          )
        );
        getQuote(categories[Math.round(Math.random() * 67)]);
      } else {
        getQuote(category);
      }
    }
  );
}

async function getQuote(category) {
  try {
    let url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

    await axios
      .get(url, {
        params: {
          category,
        },
        headers: {
          "X-Api-Key": API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data);
        init();
      });
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(`No se pudo obtener una cita de esa categoría`);
  }
}

init();
