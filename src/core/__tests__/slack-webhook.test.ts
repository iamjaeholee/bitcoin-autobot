import { sendMessage } from "../slack-webhook";

describe("slack webhook function", () => {
  it("should send message", async () => {
    const section = {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "section test",
      },
      fields: [
        {
          type: "mrkdwn",
          text: "test",
        },
      ],
    };
    const sectionTest = [section, section, section];

    const result = await sendMessage(sectionTest);
    expect(result).toEqual("ok");
  });
});
