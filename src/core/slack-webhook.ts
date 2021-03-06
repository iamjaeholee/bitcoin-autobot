import { Method, AxiosRequestConfig } from "axios";
import apiHandler from "./api-handler";
import { botToken } from "../config/key";
import { DYN_MARKET, DYN_CHANNEL, DYN_SLACK_URL } from "../utils/mapper";

interface Section {
  type?: string;
  text?: any;
  fields?: Array<any>;
}

async function sendMessage(section: Section[] = [{}]) {
  // data
  const data = {
    channel: DYN_CHANNEL,
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
    url: DYN_SLACK_URL,
    data,
    headers: {
      Authorization: `Bearer ${botToken}`,
    },
  };

  return await apiHandler.getInformation(config);
}

export { sendMessage };
