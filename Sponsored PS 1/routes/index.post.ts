import { getJSON } from "../utils/getJSON";

export default eventHandler(async (event) => {
  const bodyStream = getRequestWebStream(event);
  const body = await getJSON(bodyStream)

  if (body.sender_type === "bot") {
    return { message: 'hi, bot' };
  }

  if (body.text !== "ping") {
    return { message: 'hi, user' };
  }

  const bot_id = process.env.BOT_ID;

  const data = {
    text: "pong",
    bot_id: bot_id,
  };

  fetch('https://api.groupme.com/v3/bots/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return { message: 'pong' };
});
