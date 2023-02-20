// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse } from "@/common/types/api";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEO_API_KEY = process.env.GEO_API_KEY || "";
const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": GEO_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  const prefix = req.query["prefix"];
  await fetch(`${GEO_API_URL}/cities?namePrefix=${prefix}`, GEO_API_OPTIONS)
    .then((response) => response.json())
    .then((response) => res.status(200).json({ data: response.data }))
    .catch((error) => res.status(500).json(error));
}
