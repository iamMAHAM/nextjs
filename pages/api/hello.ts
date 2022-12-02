// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";
import cleaner from "../../utils/seed";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.on();
  await cleaner();
  res.status(200).json({ name: "John Doe" });
  await db.off();
}
