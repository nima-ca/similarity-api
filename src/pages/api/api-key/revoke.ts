import { withMethods } from "@src/lib/api-middleware/withMethods";
import { authOptions } from "@src/lib/auth";
import { db } from "@src/lib/db";
import { methods } from "@src/lib/enum";
import { RevokeApiData } from "@src/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RevokeApiData>
) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      res.status(401).json({
        success: false,
        error: "UnAuthorized to perform this action.",
      });
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: { userId: user?.id, enabled: true },
    });

    if (!existingApiKey) {
      res.status(500).json({
        success: false,
        error: "No valid API key found!",
      });
    }

    // invalidate api key
    await db.apiKey.update({
      where: { id: existingApiKey?.id },
      data: { enabled: false },
    });

    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export default withMethods([methods.POST], handler);
