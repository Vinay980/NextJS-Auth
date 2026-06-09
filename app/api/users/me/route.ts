import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/app/dbConfig/dbConfig";


export async function GET(request:NextRequest) {
    try {
        await dbConnect();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password")
        return NextResponse.json({message:"User Found",data:user})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unable to fetch user";
        return NextResponse.json({error:message}, {status:400})
    }
}
