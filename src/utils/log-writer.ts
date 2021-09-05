import { sendMessage } from "../core/slack-webhook";

interface writeAverAndKInput {
  av: number;
  k: number;
}

async function writeAverAndK(input: writeAverAndKInput) {
  const { av, k } = input;

  const section = [];
  section.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "> 오늘의 Av와 k는 ?",
    },
    fields: [
      {
        type: "mrkdwn",
        text: `*Av: ${av} && k: ${k}* `,
      },
    ],
  });

  await sendMessage(section);
}

function buyAlertWriter() {
  const section = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*-10%이상, 매수하는 날임*",
    },
  };

  const result = sendMessage([section]);
}

// write judge to slack
interface judgeWrigerInput {
  parsedData: {
    trade_price: number;
  };

  beforeYesterDayParsedData: {
    trade_price: number;
  };

  yesterdayEms: number;
}

export { writeAverAndK, buyAlertWriter };
