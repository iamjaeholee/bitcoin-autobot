import { Method, AxiosRequestConfig } from "axios";
import apiHandler from "./api-handler";
import { botToken } from "../config/key";
import { SLACK_INCOMING_WEBHOOK } from "../config";
import { DYN_MARKET } from "../utils/mapper";

interface Section {
  type?: string;
  text?: any;
  fields?: Array<any>;
}

async function sendMessage(section: Section[] = [{}]) {
  // data
  const data = {
    channel: "C02BYCW9JRH",
    attachments: [
      {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `${DYN_MARKET}`,
            },
          },
          ...section,
        ],
      },
    ],
  };

  // config for api call
  const config: AxiosRequestConfig = {
    method: "post" as Method,
    url: SLACK_INCOMING_WEBHOOK,
    data,
    headers: {
      Authorization: `Bearer ${botToken}`,
    },
  };

  return await apiHandler.getInformation(config);
}

export { sendMessage };
