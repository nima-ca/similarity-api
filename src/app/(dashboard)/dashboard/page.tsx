import ApiDashboard from "@src/components/ApiDashboard";
import RequestApiKey from "@src/components/RequestApiKey";
import { authOptions } from "@src/lib/auth";
import { db } from "@src/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Similarity API | Dashboard",
  description: "Free & open-source text similarity API",
};

const DashBoardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: { userId: session.user.id, enabled: true },
  });

  return (
    <>
      <div className="max-w-7xl mx-auto mt-16">
        {apiKey ? <ApiDashboard /> : <RequestApiKey />}
      </div>
    </>
  );
};

export default DashBoardPage;
