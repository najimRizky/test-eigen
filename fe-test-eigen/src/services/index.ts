import { IApiRequest } from "./interface"

const API_KEY = import.meta.env.VITE_API_KEY
const SIZE_PER_PAGE = import.meta.env.VITE_SIZE_PER_PAGE

export const apiRequest = async (params: IApiRequest) => {
  const {
    url,
    body = {},
    headers = {},
    method = "GET",
  } = params

  try {

    const fixedUrl = new URL(url)
  
    const res = await fetch(fixedUrl.toString(), {
      method: method,
      headers: {
        ...headers,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: ["POST", "PATCH"].includes(method) ? JSON.stringify(body) : undefined,
    })
  
    if (!res?.ok) {
      return {
        data: null,
        metadata: null,
        error: {
          message: res.statusText,
          status: res.status
        }
      }
    }
  
    const data = await res?.json()
    const metadata = {
      maxPage: data.totalResults ? Math.ceil(data.totalResults / SIZE_PER_PAGE) : 1,
      totalElement: data.totalResults || 0,
      page: Number(fixedUrl.searchParams.get("page")) || 1,
    }
  
    const response = {
      data,
      metadata,
      error: null
    }
  
    return response
  } catch (error) {
    return {
      data: null,
      metadata: null,
      error: {
        message: "Something went wrong",
        status: 500
      }
    }
  }
}

export const getRequest = async ({ url }: IApiRequest) => {
  const res = await apiRequest({ url })
  return res
}

// Add other methods here..