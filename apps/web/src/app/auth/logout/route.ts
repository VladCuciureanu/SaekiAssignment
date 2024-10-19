import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let redirectUrl = request.nextUrl;

  const proxyHost = request.headers.get("host");
  if (proxyHost) {
    redirectUrl.host = `${proxyHost}:80`;
  }

  redirectUrl.pathname = "/auth/login";

  const response = NextResponse.redirect(redirectUrl);

  response.cookies.delete("current_user");
  response.cookies.delete("token");

  return response;
}
