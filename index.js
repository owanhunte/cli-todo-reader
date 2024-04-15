#! /usr/bin/env node

import { Command } from "commander";
import { consumeTODOs, getOptions } from "./src/helper.js";
import { DEFAULT_FETCH_COUNT, DEFAULT_SELECTION } from "./src/constants.js";
import ora from "ora";

const program = new Command();

program
  .name("todos-consumer")
  .description(
    "Consume the first 'n' even or odd numbered TODOs from a pre-determined resource URL and output the title and whether it is completed or not."
  )
  .version("1.0.0")
  .option("-c, --count <count>", "The number of TODOs to consume. Must be >= 1.", parseInt(DEFAULT_FETCH_COUNT))
  .option(
    "-s, --selection <even | odd>",
    "The selection of TODOs to consume, if even or odd numbered.",
    DEFAULT_SELECTION
  );

program.parse();

const options = getOptions(program);

(async () => {
  const spinner = ora(
    `Attempting to consume the first ${options.count} ${options.selection} numbered TODOs...\n`
  ).start();

  await consumeTODOs(options);

  spinner.stop();
})();
