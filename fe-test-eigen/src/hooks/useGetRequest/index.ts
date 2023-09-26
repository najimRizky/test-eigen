import { getRequest } from "../../services"
import { IUseGetRequest } from "./interface"
import { useState, useEffect } from "react"

// const API_URL = import.meta.env.VITE_API_URL
const API_URL = window.location.origin

const useGetRequest = ({ url, queryParams = {}, }: IUseGetRequest) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [response, setResponse] = useState<unknown>(null)

  const getData = async () => {
    setLoading(true)
    const fixedUrl = new URL(url, API_URL)
    
    const params: Record<string, string | number | unknown> = {
      page: queryParams.page || 1,
      pageSize: queryParams.pageSize || 10,
      country: queryParams.country || "id",
      category: queryParams.category || "general",
      q: queryParams.q || "",
      ...queryParams,
    }

    Object.keys(params).forEach((key) => {
      fixedUrl.searchParams.set(key, String(params[key]))
    })

    const res = await getRequest({ url: fixedUrl.toString() })

    if (res.error) {
      setError(res.error)
    }

    setLoading(false)
    setResponse({
      metadata: res.metadata,
      data: res.data,
    })
  }

  useEffect(() => {
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, queryParams])


  return {
    loading,
    error,
    response,
  }
}

export default useGetRequest