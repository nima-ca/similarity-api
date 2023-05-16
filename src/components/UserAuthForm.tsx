"use client";

import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";
import Button from "@/ui/Button";
import { loginProviders } from "@src/lib/enum";
import { toast } from "./ui/Toast";
import { signIn } from "next-auth/react";
import Icons from "./Icons";

const UserAuthForm: FunctionComponent = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const setLoadingState = (state: boolean, provider: loginProviders) => {
    if (provider === loginProviders.Google) {
      setIsGoogleLoading(state);
    }

    if (provider === loginProviders.Github) {
      setIsGithubLoading(state);
    }
  };

  const login = async ({ provider }: { provider: loginProviders }) => {
    setLoadingState(true, provider);
    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: `Error signing in with ${provider}`,
        message: "Try again later",
        type: "error",
      });
    } finally {
      // setLoadingState(false, provider);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-6 items-center justify-between"
      )}
    >
      <Button
        onClick={() => login({ provider: loginProviders.Google })}
        isLoading={isGoogleLoading}
        className="max-w-sm w-full"
        variant="ghost"
        disabled={isGoogleLoading || isGithubLoading}
      >
        <Icons.GoogleIcon className="w-6 h-6 mr-3" />
        Google
      </Button>
      <Button
        onClick={() => login({ provider: loginProviders.Github })}
        isLoading={isGithubLoading}
        className="max-w-sm w-full"
        variant="ghost"
        disabled={isGoogleLoading || isGithubLoading}
      >
        <Icons.GithubIcon className="w-6 h-6 mr-3" />
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
