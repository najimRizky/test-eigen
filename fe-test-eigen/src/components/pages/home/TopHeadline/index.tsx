import { apiPath } from "../../../../config/apiPath"
import useGetRequest from "../../../../hooks/useGetRequest"
import { useState } from "react"
import { Space } from "antd"
import IArticle from "../../../../interfaces/Article"
import CardArticle from "../../../modules/CardArticle"
import CardArticleSkeleton from "../../../modules/CardArticle/skeleton"

const TopHeadline = () => {
  const [params] = useState({})
  const { error, loading, response } = useGetRequest({
    url: apiPath.topHeadlines,
    queryParams: params
  })

  if (loading) return (
    <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
      {Array(10).fill(0).map((_, id) =>
        <CardArticleSkeleton key={id} />
      )}
    </Space>
  )

  if (error) return <div>Something Went Wrong</div>
  return (
    <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
      {response?.data?.articles?.map((article: IArticle, id: number) =>
        <CardArticle
          key={id}
          article={article}
        />
      )}
    </Space>
  )
}

export default TopHeadline