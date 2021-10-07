import schedule from "node-schedule";
import dataHandler from "./core/data-handler";
import { format, add, sub } from "date-fns";
import DbManager from "./database";
import semaphoreHandler from "./core/semaphore-handler";
import { writeAverAndK } from "./utils/log-writer";
import { DYN_TABLE } from "./utils/mapper";
import { sendMessage } from "./core/slack-webhook";
import Error from "express";

// TODO ScheduleJob to UTC time
// UTC 9
console.log("service has been started");

schedule.scheduleJob("0 0 0 * * *", async () => {
  const today = new Date(Date.now());
  const nextDay = add(today, { days: 1 });

  // 매 9시마다 00시 데이터를 테이블에 EMA와 함께 저장
  await dataHandler.putDataWithEms(
    {
      year: today.getUTCFullYear(),
      month: today.getUTCMonth(),
      date: today.getUTCDate(),
    },
    {
      year: nextDay.getUTCFullYear(),
      month: nextDay.getUTCMonth(),
      date: nextDay.getUTCDate(),
    }
  );

  // 파라미터
  const getParams = {
    TableName: DYN_TABLE,
    Key: {
      date: { S: format(today, "yyyy-MM-dd") },
    },
  };

  const prevGetParams = {
    TableName: DYN_TABLE,
    Key: {
      date: { S: format(sub(today, { days: 1 }), "yyyy-MM-dd") },
    },
  };

  // get item
  try {
    // yesterDayData
    const yesterdayData = await DbManager.getItem(getParams);
    const parsedData = JSON.parse(yesterdayData?.Item?.data?.S as string);
    const yesterdayEms = Number(yesterdayData?.Item?.ems?.N);

    // beforeYesterDayData
    const beforeYesterDayData = await DbManager.getItem(prevGetParams);
    const beforeYesterDayParsedData = JSON.parse(
      beforeYesterDayData?.Item?.data?.S as string
    );

    const beforeYesterDayEms = Number(beforeYesterDayData?.Item?.ems?.N);

    const section = [];
    // trade_price <= ems sell all ETH
    // 판단 플로우 로깅
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "> 판단 플로우가 시작했습니다.",
      },
      fields: [
        {
          type: "mrkdwn",
          text: "오늘은 어떤날일까유 ?",
        },
      ],
    });
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*trade_price*",
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${parsedData.trade_price}`,
        },
      ],
    });
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*ema*",
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${yesterdayEms}`,
        },
      ],
    });

    // trade price가 ems보다 작은 경우
    if (parsedData.trade_price < yesterdayEms) {
      section.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "> 오늘은",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `trade_price < ema 이거임`,
          },
        ],
      });
      const diff =
        parsedData.trade_price - beforeYesterDayParsedData.trade_price;
      const diffRate = diff / beforeYesterDayParsedData.trade_price;
      section.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*그래서 2일전 트프랑 비교해보면*",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `- 1일전 trade_price - 2일전 trade_price: ${diff}`,
          },
        ],
      });
      section.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*변화율*",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `${diffRate}`,
          },
        ],
      });

      // 상태가 매수로 바뀌는 부분
      if (diffRate <= -0.1) {
        section.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*변화율이*",
          },
          fields: [
            {
              type: "mrkdwn",
              text: `-10%보다 낮음`,
            },
          ],
        });
        section.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "> 오늘의 추천",
          },
          fields: [
            {
              type: "mrkdwn",
              text: `오늘은 사는 날인 갑다 ~! 매수 플로우 진행하겠음 (구현 예정)`,
            },
          ],
        });

        // 세마포어 상태 매수로 셋팅
        await semaphoreHandler.setState("state", "buy");
      } else {
        section.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*변화율이*",
          },
          fields: [
            {
              type: "mrkdwn",
              text: `-10%보다 낮음`,
            },
          ],
        });
        section.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "> 오늘의 추천",
          },
          fields: [
            {
              type: "mrkdwn",
              text: `오늘은 김대기하는 날인 갑다 ~! *김대기*`,
            },
          ],
        });

        // 세마포어 셋업
        await semaphoreHandler.setSemaphore(today.toISOString().substr(0, 10));
      }
    } else {
      section.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "> 오늘은",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `trade_price >= ema 이거임`,
          },
        ],
      });
      section.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*다음플로우*",
        },
        fields: [
          {
            type: "mrkdwn",
            text: `Min Max 구현 예정임`,
          },
        ],
      });
    }

    await sendMessage(section);
  } catch (e: any) {
    const section = [];
    // trade_price <= ems sell all ETH
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "> 이거슨 에러다.",
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${e?.message}`,
        },
      ],
    });

    await sendMessage(section);
  }
});

// every 4 hours schedule
schedule.scheduleJob("0 0 */4 * * *", async () => {
  const today = new Date(Date.now());
  const nextDay = add(today, { hours: 4 });

  try {
    await dataHandler.putDataQuarterly(
      {
        year: today.getUTCFullYear(),
        month: today.getUTCMonth(),
        date: today.getUTCDate(),
        hour: today.getUTCHours(),
      },
      {
        year: nextDay.getUTCFullYear(),
        month: nextDay.getUTCMonth(),
        date: nextDay.getUTCDate(),
        hour: nextDay.getUTCHours(),
      }
    );

    const result = await dataHandler.getAverAndK(today);
    await writeAverAndK(result);
  } catch (e: any) {
    const section = [];
    // trade_price <= ems sell all ETH
    section.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: "> 이거슨 에러다.",
      },
      fields: [
        {
          type: "mrkdwn",
          text: `${e?.message}`,
        },
      ],
    });

    await sendMessage(section);
  }
});
