import ApiKeyOptions from "@/components/ApiKeyOptions";
import Table from "@/components/Table";
import { db } from "@/lib/db";
import { Input } from "@/ui/Input";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { authOptions } from "@src/lib/auth";
import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const ApiDashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id },
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);
  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: { apiKeyId: { in: apiKeys.map((key) => key.id) } },
  });

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome Back, {session.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center ">
        <Paragraph>Your Api Key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKey={activeApiKey.key} />
      </div>

      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your Api History:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
