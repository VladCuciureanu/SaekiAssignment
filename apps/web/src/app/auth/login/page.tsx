import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/vector/logo";
import { LoginForm } from "./form";

export const metadata: Metadata = {
  title: "Login | Saeki",
};

export default function LoginPage() {
  return (
    <>
      <div className="container relative grid h-full min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/auth/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Register
        </Link>
        <div className="bg-muted relative hidden h-full flex-col p-10 text-black lg:flex dark:border-r dark:text-white">
          <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <div className="flex flex-row items-center justify-start">
              <Logo />
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi vehicula cursus dui, ut dignissim est sollicitudin sit
                amet. Curabitur felis ex, venenatis.&rdquo;
              </p>
              <footer className="text-sm">John Doe</footer>
            </blockquote>
          </div>
        </div>
        <div className="px-2 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log into your account
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your credentials below to log in
              </p>
            </div>
            <LoginForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
