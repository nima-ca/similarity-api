"use client";

import { FunctionComponent, useState } from "react";
import Button from "@/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/Toast";

interface SignOutButtonProps {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const SingOutUser = async () => {
    setIsLoading(true);

    try {
      await signOut();
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error signing Out",
        message: "Try again later",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={SingOutUser} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
