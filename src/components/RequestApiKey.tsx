"use client";

import { FormEvent, FunctionComponent, useState } from "react";
import { toast } from "@/ui/Toast";
import { createApiKey } from "@src/helpers/createApiKey";
import Icons from "@/components/Icons";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";
import Button from "@/ui/Button";

const RequestApiKey: FunctionComponent = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey ?? null);
      toast({
        title: "Success",
        message: "Api key generated successfully!",
        type: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          message: error.message,
          type: "error",
        });

        return;
      }
      toast({
        title: "Error",
        message: "Something went wrong!",
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl ">
      <div className="flex flex-col gap-6 items-center">
        <Icons.Key className="mx-auto h-12 w-12 text-gray-400 " />
        <LargeHeading>Request your Api Key</LargeHeading>
        <Paragraph>
          {apiKey
            ? "🚀 Here is your API key: "
            : "You haven't requested an API key yet."}
        </Paragraph>
      </div>

      <form onSubmit={createNewApiKey} className="mt-6 sm:flex sm:items-center">
        <div className="relative rounded-md shadow-md sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300  "
            />
          ) : null}

          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API Key to display it here!"
          />
        </div>

        <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0 ">
          <Button disabled={Boolean(apiKey)} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
