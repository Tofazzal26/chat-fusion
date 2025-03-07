import UserModel from "@/app/UserModel/UserModel";
import ConnectMongoose from "@/lib/ConnectMongoose/ConnectMongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectMongoose();
    const data = await req.json();
    const user = await UserModel.create(data);
    return NextResponse.json({
      data: user,
      message: "Data post success",
      status: 200,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "There was a server errror",
      success: false,
      status: 500,
    });
  }
};
