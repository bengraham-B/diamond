import { NextResponse } from "next/server";

export async function GET(){
    const serverENV = process.env.ENV_SERVER_BASE
    console.log("Server: " + serverENV)
    return NextResponse.json({server: serverENV}, {status: 200})
}