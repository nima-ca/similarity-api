"use client";

import { FunctionComponent, useState } from "react";
import Button from "@/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/Toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropDownMenu";
import Icons from "@/components/Icons";
import { loginProviders } from "@src/lib/enum";

const SignInButton: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async ({ provider }: { provider: loginProviders }) => {
    setIsLoading(true);
    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: `Error signing in with ${provider}`,
        message: "Try again later",
        type: "error",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button isLoading={isLoading}>
          Sign In
          <span className="sr-only">Sign In</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem
          onClick={() => login({ provider: loginProviders.Google })}
        >
          <Icons.GoogleIcon className="mr-2 h-4 w-4" />
          <span>Google</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => login({ provider: loginProviders.Github })}
        >
          <Icons.GithubIcon className="mr-2 h-4 w-4" />
          <span>Github</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignInButton;
