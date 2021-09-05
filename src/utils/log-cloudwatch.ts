import { sendMessage } from "../core/slack-webhook";

async function logDayCandle(dayCandle: any, ema: number) {
  const section = [];
  section.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "> 따끈 따끈한 일일봉이 도착했슴둥",
    },
    fields: [
      {
        type: "mrkdwn",
        text: `- time: ${new Date(Date.now()).toISOString()} `,
      },
    ],
  });
  for (const [key, value] of Object.entries(dayCandle)) {
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${key}*`,
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${value}`,
        },
      ],
    });
  }
  section.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: `> ema`,
    },
    fields: [
      {
        type: "mrkdwn",
        text: `${ema}`,
      },
    ],
  });
  await sendMessage(section);
}

async function logQuarterCandle(quarterCandle: any) {
  const section = [];
  section.push({
    type: "section",
    text: {
      type: "mrkdwn",
      text: "> 따끈 따끈한 쿼터캔들이 도착했슴둥",
    },
    fields: [
      {
        type: "mrkdwn",
        text: `- time: ${new Date(Date.now()).toISOString()} `,
      },
    ],
  });
  // start line
  for (const [key, value] of Object.entries(quarterCandle)) {
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${key}*`,
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${value}`,
        },
      ],
    });
  }
  console.error(await sendMessage(section));
}

export { logDayCandle, logQuarterCandle };
