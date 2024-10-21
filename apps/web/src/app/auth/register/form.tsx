"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { UserAuthForm } from "../user-auth-form";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  async function handleRegister(email: string, password: string) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
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

  return <UserAuthForm onSubmit={handleRegister} error={error} />;
}
