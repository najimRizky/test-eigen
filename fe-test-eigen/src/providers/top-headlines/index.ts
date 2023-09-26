import { apiPath } from "../../config/apiPath"
import { getRequest } from "../../services"
import { IGetTopHeadlines } from "./interface"

// const API_URL = import.meta.env.VITE_API_URL
const API_URL = window.location.origin
const SIZE_PER_PAGE = import.meta.env.VITE_SIZE_PER_PAGE

export const getTopHeadlines = async ({
  page = 1,
  country = "id",
  category = "general",
  q = "",
}: IGetTopHeadlines) => {
  const path = apiPath.topHeadlines
  const url = new URL(path, API_URL)

  url.searchParams.set("page", String(page))
  url.searchParams.set("country", country)
  url.searchParams.set("category", category)
  url.searchParams.set("q", q)
  url.searchParams.set("pageSize", String(SIZE_PER_PAGE))

  const res = await getRequest({ url: url.toString() })
  return res
}