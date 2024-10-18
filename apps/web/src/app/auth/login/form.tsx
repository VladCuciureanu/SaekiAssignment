"use client";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "../user-auth-form";
import { useState } from "react";
import { cookies } from "next/headers";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  async function handleLogin(email: string, password: string) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      },
    );
    switch (result.status) {
      case 200:
        router.push("/");
        setError(undefined);
        break;
      case 401:
        setError("Invalid credentials");
        break;
      case 400:
        setError(
          "Password must be at least 6 chars long and email must be valid.",
        );
        break;
      default:
        setError("Failed to register: " + result.statusText);
    }
  }

  return <UserAuthForm onSubmit={handleLogin} error={error} />;
}
