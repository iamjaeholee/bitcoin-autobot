import {logger} from "./logger";

interface writeAverAndKInput {
  av: number,
  k: number
}

function writeAverAndK(input: writeAverAndKInput) {
  const {av, k} = input;

  logger.info(`====== Av is ====== ${av}`);
  logger.info(`====== k is ====== ${k}`);
}

export {
  writeAverAndK
}