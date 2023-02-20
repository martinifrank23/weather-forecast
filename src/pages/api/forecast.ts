// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse } from "@/common/types/api";

const WEATHER_API_URL = "http://www.7timer.info/bin/api.pl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  const lat = req.query["lat"];
  const lng = req.query["lng"];
  await fetch(
    `${WEATHER_API_URL}?lon=${lng}&lat=${lat}&product=civillight&output=json`
  )
    .then((response) => response.json())
    .then((response) => res.status(200).json({ data: response }))
    .catch((error) => res.status(500).json(error));
}
