#! /usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

import { Command } from "commander";
import { getOptions } from "./src/helper.js";

const DEFAULT_READER_COUNT = process.env.DEFAULT_READER_COUNT;
const DEFAULT_SELECTION = process.env.DEFAULT_SELECTION;

const program = new Command();

program
  .name("todos-consumer")
  .description(
    "Consume the first 'n' even or odd numbered TODOs from a pre-determined resource URL and output the title and whether it is completed or not."
  )
  .version("1.0.0")
  .option("-c, --count <count>", "The number of TODOs to consume.", parseInt(DEFAULT_READER_COUNT))
  .option(
    "-s, --selection <even | odd>",
    "The selection of TODOs to consume, if even or odd numbered.",
    DEFAULT_SELECTION
  );

program.parse();

const options = getOptions(program);

console.log(options);
