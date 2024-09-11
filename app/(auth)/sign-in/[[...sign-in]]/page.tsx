import { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SignInForm from "@/components/signin-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      {/* Main container */}
      <div className="container mx-auto h-screen flex items-center justify-center p-4">
        {/* Full layout for larger screens */}
        <div className="relative hidden h-full w-full max-w-4xl grid-cols-1 rounded-lg bg-muted shadow-lg md:grid md:grid-cols-2 lg:max-w-none">
          {/* Left panel content - Hidden on mobile */}
          <div className="relative hidden flex-col bg-muted p-10 text-white dark:border-r md:flex">
            <div className="absolute inset-0 bg-zinc-900 rounded-l-lg" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              {/* Replace the SVG with a PNG image */}
              <Image
                src="/icon.png" // Path to your PNG logo
                alt="Logo"
                width={50} // Adjust size based on your preference
                height={50}
                className="mr-2 invert"
              />
              STARTUP DEFENSE
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                {/* <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p> */}
                <footer className="text-sm">
                  Copyright Startup Defense LLC - 2024
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Right panel with SignInForm */}
          <div className="flex items-center justify-center p-6">
            <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
              <SignInForm />
            </div>
          </div>
        </div>

        {/* Only show SignInForm on mobile */}
        <div className="md:hidden w-full">
          <div className="flex items-center justify-center p-6">
            <div className="w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
