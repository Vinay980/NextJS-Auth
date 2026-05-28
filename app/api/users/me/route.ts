import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/app/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Invalid token";
    console.error("Error:", msg);
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
