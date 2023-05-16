"use client";

import Icons from "@/components/Icons";
import { buttonVariants } from "@/ui/Button";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import UserAuthForm from "@src/components/UserAuthForm";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Similarity API | Login",
  description: "Free & open-source text similarity API",
};

const Login: FC = () => {
  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col items-center justify-center ">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
        <div className="flex flex-col items-center gap-6 text-center ">
          <Link
            className={buttonVariants({ variant: "ghost", className: "w-fit" })}
            href="/"
          >
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <LargeHeading>Welcome back!</LargeHeading>
          <Paragraph>
            Please sign in using your Github or Google account
          </Paragraph>

          <UserAuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
