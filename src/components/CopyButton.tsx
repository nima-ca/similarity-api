"use client";

import Button from "@/ui/Button";
import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { toast } from "./ui/Toast";
import Icons from "./Icons";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FunctionComponent<CopyButtonProps> = ({
  className,
  valueToCopy,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: "Copied!",
          message: "API key to clipboard",
          type: "success",
        });
      }}
      variant="ghost"
      className={className}
    >
      <Icons.Copy className="h-5 w-5" />
    </Button>
  );
};

export default CopyButton;
