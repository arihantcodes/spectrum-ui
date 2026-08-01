import { NextRequest, NextResponse } from "next/server";
import Component from "@/models/components.model";
import { connectDb } from "@/config/dbConfig/dbConfig";

// api/get-all-pending-components?email={ADMIN_EMAIL}&password={ADMIN_PASSWORD}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const password = req.nextUrl.searchParams.get("password");
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 },
      );
    }

    // Show all pending components
    await connectDb();
    const pendingComponents = await Component.find({ status: "pending" });

    const count = pendingComponents.length;

    return NextResponse.json({ pendingComponents, count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
