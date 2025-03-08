import axios from "axios";

const { NextResponse } = require("next/server");

export const POST = async (request) => {
  try {
    let { question } = await request.json();
    if (!question) {
      return NextResponse.json({ status: 400, message: "Message is required" });
    }
    const response = await axios.post(
      "https://api.echogpt.live/v1/chat/completions",
      {
        messages: [{ role: "system", content: question }],
        model: "EchoGPT",
      },
      {
        headers: { "x-api-key": process.env.ECHO_API_KEY },
      }
    );
    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: "Server error" });
  }
};
