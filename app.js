import axios from "axios";
import chalk from "chalk";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const API_KEY = "Six/vVrQUY1+ep2uE5dtXw==CHpG8S8TqyPmIrK9";

function init() {
  let category = "";

  rl.question("Escribe una categoria\n", (category) => {
    if (!category) {
      console.log(chalk.red("No introduciste una categoria"));
      init();
    } else {
      getQuote(category);
    }
  });
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
      });
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(`No se pudo obtener una cita de esa categoría`);
  }
}

init();
