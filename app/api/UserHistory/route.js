import HistoryModel from "@/app/HistoryModel/HistoryModel";
import ConnectMongoose from "@/lib/ConnectMongoose/ConnectMongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await ConnectMongoose();
    const data = await request.json();
    if (!data.question || !data.answer) {
      return NextResponse.json({
        message: "Invalid data format",
        status: 400,
        success: false,
      });
    }
    const result = await HistoryModel.create(data);
    return NextResponse.json({
      message: "Data post success",
      status: 200,
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      message: "There was a server error",
      status: 500,
      success: false,
      data: error,
    });
  }
};
