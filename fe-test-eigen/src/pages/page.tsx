import { Space, Select, Button } from "antd"
import { useState, useMemo } from "react"
import { NavLink } from "react-router-dom"
import CardArticle from "../components/modules/CardArticle"
import CardArticleSkeleton from "../components/modules/CardArticle/skeleton"
import SectionTitle from "../components/modules/SectionTitle"
import { apiPath } from "../config/apiPath"
import { COUNTRY_OPTIONS } from "../config/options"
import useGetRequest from "../hooks/useGetRequest"
import IArticle from "../interfaces/Article"

const HomePage = () => {
  const [params, setParams] = useState({
    country: "id",
  })

  const { error, loading, response } = useGetRequest({
    url: apiPath.topHeadlines,
    queryParams: params
  })

  const onCountryChange = (value: string) => {
    setParams({
      ...params,
      country: value
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
              onChange={(value) => onCountryChange(value)}
              filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLocaleLowerCase())}
              filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
            />
          </Space>
        </Space>

        {useMemo(() => (
          renderList()
          // eslint-disable-next-line react-hooks/exhaustive-deps
        ), [loading])}

        <NavLink to={`/top-headlines?country=${params.country}`}>
          <Button type="primary" size="large" block style={{ marginTop: "2rem" }}>See More</Button>
        </NavLink>
      </Space>
    </div>
  )
}

export default HomePage