import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({
        hello:"world"
    })
}

export async function POST(request:Request){

    const data=request.body;
    return NextResponse.json({
       data
    })
}