import { connectDb } from "@/config/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Component from "@/models/components.model";

// api/dashboard?email={ADMIN_EMAIL}&password={ADMIN_PASSWORD}
// reqBody: { id: string, status: string }
// status: pending, approved, rejected

export async function PATCH(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const password = req.nextUrl.searchParams.get("password");

  try {
    // Check if email and password are correct
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action" },
        { status: 401 },
      );
    }

    const reqBody = await req.json();

    // Ensure both id and status are provided in the request body
    if (!reqBody.id || !reqBody.status) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDb();

    // Update the status of the component
    const approveComp = await Component.findByIdAndUpdate(
      reqBody.id,
      { status: reqBody.status },
      { new: true },
    );

    if (!approveComp) {
      return NextResponse.json(
        { message: "Component not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Status updated", approveComp },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
