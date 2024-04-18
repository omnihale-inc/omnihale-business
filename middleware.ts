import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    NextResponse.redirect("/auth");
  }
}
