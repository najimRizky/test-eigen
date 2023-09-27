import { Space, Select, Pagination } from "antd"
import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import CardArticle from "../../components/modules/CardArticle"
import CardArticleSkeleton from "../../components/modules/CardArticle/skeleton"
import SectionTitle from "../../components/modules/SectionTitle"
import { apiPath } from "../../config/apiPath"
import useGetRequest from "../../hooks/useGetRequest"
import IArticle from "../../interfaces/Article"
import { CATEGORY_OPTIONS, COUNTRY_OPTIONS } from "../../config/options"

const TopHeadlinesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const countryParam = searchParams.get("country") || "id"
  const categoryParam = searchParams.get("category") || "general"
  const pageParam = searchParams.get("page") || 1

  const [params, setParams] = useState({
    country: countryParam,
    category: categoryParam,
    page: pageParam
  })

  const { error, loading, response } = useGetRequest({
    url: apiPath.topHeadlines,
    queryParams: params
  })

  const handleChangeParams = (key: "country" | "category" | "page", value: string) => {
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
        <Space
          direction="horizontal"
          align="center"
          size={"large"}
          className="w-full"
          style={{ justifyContent: "space-between" }}
          wrap={true}
        >
          <SectionTitle
            title="Top Headline"
            subtitle="Top Headline from Eigen News"
            level={2}
          />
          <Space direction="horizontal">
            <Space direction="vertical">
              <p>Category:</p>
              <Select
                disabled={loading}
                loading={loading}
                showSearch
                value={CATEGORY_OPTIONS.find((category) => category.value === params.category)?.label}
                optionFilterProp="children"
                options={CATEGORY_OPTIONS}
                style={{ width: 180 }}
                size="large"
                onChange={(value) => handleChangeParams("category", value)}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLocaleLowerCase())}
                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
              />
            </Space>
            <Space direction="vertical">
              <p>Country:</p>
              <Select
                disabled={loading}
                loading={loading}
                showSearch
                value={COUNTRY_OPTIONS.find((country) => country.value === params.country)?.label}
                optionFilterProp="children"
                options={COUNTRY_OPTIONS}
                style={{ width: 180 }}
                size="large"
                onChange={(value) => handleChangeParams("country", value)}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLocaleLowerCase())}
                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
              />
            </Space>
          </Space>
        </Space>

        {useMemo(() => (
          renderList()
          // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [loading])}
      </Space>
    </div>
  )
}

export default TopHeadlinesPage