"use client";

import Icons from "@/components/Icons";
import Button from "@/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropDownMenu";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@src/helpers/createApiKey";
import { revokeApiKey } from "@src/helpers/revokeApiKey";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

interface ApiKeyOptionsProps {
  apiKey: string;
}

const ApiKeyOptions: FunctionComponent<ApiKeyOptionsProps> = ({ apiKey }) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<boolean>();
  const [isRevoking, setIsRevoking] = useState<boolean>();

  const createNewApiKey = async () => {
    try {
      setIsCreating(true);
      await revokeApiKey();
      await createApiKey();
      router.refresh();
      toast({
        title: "Success",
        message: "New API Key was successfully created!",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Error creating api key",
        message: "Please try again later",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    try {
      setIsRevoking(true);
      await revokeApiKey();
      router.refresh();
      toast({
        title: "Success",
        message: "API Key was successfully revoked!",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Error revoking api key",
        message: "Please try again later",
        type: "error",
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isCreating || isRevoking}>
        <Button variant="ghost" className="flex gap-2 items-center">
          {isCreating && <p>Creating new Key</p>}
          {isRevoking && <p>Revoking key</p>}

          {isRevoking || isCreating ? (
            <Icons.Loader2 className="animate-spin h-4 w-4" />
          ) : null}

          {!isRevoking && !isCreating ? (
            <Icons.Settings className="h-5 w-5" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={createNewApiKey}>
          <Icons.Plus className="h-5 w-5" />
          <span className="mx-3">Create new key</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          <Icons.Trash2 className="h-5 w-5" />
          <span className="mx-3">Revoke key</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKey);

            toast({
              title: "Copied!",
              message: "API key to clipboard",
              type: "success",
            });
          }}
        >
          <Icons.Copy className="h-5 w-5" />
          <span className="mx-3">Copy</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
