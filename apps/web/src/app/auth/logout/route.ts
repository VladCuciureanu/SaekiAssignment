import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth/login";

  const response = NextResponse.redirect(url);

  response.cookies.delete("current_user");
  response.cookies.delete("token");

  return response;
}
