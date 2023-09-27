import { getRequest } from "../../services"
import { IUseGetRequest } from "./interface"
import { useState, useEffect } from "react"

const API_URL = window.location.origin

const useGetRequest = ({ url, queryParams = {}, requiredParams = []}: IUseGetRequest) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [response, setResponse] = useState<any>(null)

  const getData = async () => {
    const missingParams = requiredParams.filter((param) => !queryParams[param])
    if (missingParams.length > 0) {
      setLoading(false)
      setError(null)
      setResponse(null)
      return
    }
    setLoading(true)
    const fixedUrl = new URL(url, API_URL)
    
    const params: Record<string, string | number | unknown> = {
      page: queryParams.page || 1,
      pageSize: queryParams.pageSize || 10,
      ...queryParams,
    }

    Object.keys(params).forEach((key) => {
      fixedUrl.searchParams.set(key, String(params[key]))
    })

    const res = await getRequest({ url: fixedUrl.toString() })

    if (res.error) {
      setError(res.error)
    } else {
      setError(null)
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