import { cosineSimilarity } from "@src/helpers/cosineSimilarity";
import { withMethods } from "@src/lib/api-middleware/withMethods";
import { db } from "@src/lib/db";
import { methods } from "@src/lib/enum";
import { openai } from "@src/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const requestSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res
      .status(401)
      .json({ error: "Unauthorized to perform this action" });
  }

  try {
    const { text1, text2 } = requestSchema.parse(body);

    const validApiKey = await db.apiKey.findFirst({
      where: { key: apiKey, enabled: true },
    });

    if (validApiKey === null) {
      return res.status(401).json({ error: "Invalid API Key" });
    }

    const start = new Date();

    const embedding = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data.data[0].embedding;
      })
    );

    const similarity = cosineSimilarity(embedding[0], embedding[1]);
    const duration = new Date().getTime() - start.getTime();

    await db.apiRequest.create({
      data: {
        duration: duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        usedApiKey: validApiKey.key,
        apiKeyId: validApiKey.id,
      },
    });

    return res.status(200).json({ success: true, similarity, text1, text2 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default withMethods([methods.POST], handler);
