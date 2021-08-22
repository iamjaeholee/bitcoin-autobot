import {logger} from "./logger";
import {sendMessage} from '../core/slack-webhook';

interface writeAverAndKInput {
  av: number,
  k: number
}

function writeAverAndK(input: writeAverAndKInput) {
  const {av, k} = input;

  logger.info(`====== Av is ====== ${av}`);
  logger.info(`====== k is ====== ${k}`);
}

function buyAlertWriter() {
  const section = {
      type: 'section',
      text: {
          type: 'mrkdwn',
          text: '*-10%이상, 매수하는 날임*'
      },
  }

  const result = sendMessage([section]);
}

export {
  writeAverAndK,
  buyAlertWriter
}
