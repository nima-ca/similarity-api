import { authOptions } from "@src/lib/auth";
import { db } from "@src/lib/db";
import { CreateApiData } from "@src/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { withMethods } from "@src/lib/api-middleware/withMethods";
import { methods } from "@src/lib/enum";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      res.status(401).json({
        createdApiKey: null,
        error: "UnAuthorized to perform this action.",
      });
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user?.id, enabled: true },
    });

    if (existingApiKey) {
      res.status(400).json({
        createdApiKey: null,
        error: "You already have an active api key",
      });
    }

    const createdApiKey = await db.apiKey.create({
      data: { key: nanoid(), userId: user?.id! },
    });

    return res.status(200).json({
      createdApiKey,
      error: null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        createdApiKey: null,
        error: error.issues,
      });
    }

    return res.status(500).json({
      createdApiKey: null,
      error: "Internal Server Error",
    });
  }
};

export default withMethods([methods.GET], handler);
