import axios from "axios";
import qs from "qs";
import { API_BASE_URL, API_TOKEN } from "constants/api.ts";

export const strapi = axios.create({
  baseURL: API_BASE_URL,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  paramsSerializer: (parameters) =>
    qs.stringify(parameters, { encodeValuesOnly: true }),
});
