import { Space, Pagination, Input } from "antd"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import CardArticle from "../../components/modules/CardArticle"
import CardArticleSkeleton from "../../components/modules/CardArticle/skeleton"
import SectionTitle from "../../components/modules/SectionTitle"
import { apiPath } from "../../config/apiPath"
import useGetRequest from "../../hooks/useGetRequest"
import IArticle from "../../interfaces/Article"

const EverythingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = searchParams.get("page") || 1
  const qParam = searchParams.get("q") || ""

  const [keyword, setKeyword] = useState(qParam)
  const [params, setParams] = useState({
    page: pageParam,
    q: qParam
  })

  const { error, loading, response } = useGetRequest({
    url: apiPath.everything,
    queryParams: params,
    requiredParams: ["q"]
  })

  const handleChangeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (keyword === qParam) return
      handleChangeParams("q", keyword)
    }, 500)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  const handleChangeParams = (key: "page" | "q", value: string) => {
    if (params[key] === value) return

    if (key !== "page") {
      searchParams.delete("page")
      params.page = 1
    }

    searchParams.set(key, value)
    setSearchParams(searchParams)
    setParams({
      ...params,
      [key]: value,
    })
    
    window.scrollTo(0, 0)
  }

  const renderList = () => {
    if (loading) return (
      <Space direction="vertical" size={"large"} className="w-full">
        {Array(10).fill(0).map((_, id) =>
          <CardArticleSkeleton key={id} />
        )}
      </Space>
    )

    if (error) return <div>Something Went Wrong</div>
    if (params.q === "") return (
      <p>
        Please search for a keyword
      </p>
    )
    if (!response?.data?.articles?.length) return <div>Data Not Found</div>

    return (
      <Space direction="vertical" size={"large"} className="w-full" >
        {response?.data?.articles?.map((article: IArticle, id: number) =>
          <CardArticle
            key={id}
            article={article}
          />
        )}
        <Pagination
          onChange={(page) => handleChangeParams("page", page.toString())}
          style={{ display: "flex", justifyContent: "center" }}
          current={response.metadata.page}
          total={response.metadata.totalElement}
          pageSize={Number(import.meta.env.VITE_SIZE_PER_PAGE)}
        />
      </Space>
    )
  }

  return (
    <div className="container">
      <Space direction="vertical" size={"large"} className="w-full">
        <div
          className="w-full"
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "1.5rem",
            flexWrap: "wrap"
          }}
        >
          <SectionTitle
            title="Everything"
            subtitle="Get all the articles about a topic by passing in relevant keywords."
            level={2}
          />
          <Input.Search
            loading={loading}
            placeholder="Search keyword"
            allowClear
            size="large"
            onChange={(e) => handleChangeSearchKeyword(e)}
            style={{ width: "100%", maxWidth: 400 }}
            value={keyword}
          />
        </div>

        {useMemo(() => (
          renderList()
          // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [loading, response])}
      </Space>
    </div>
  )
}

export default EverythingPage