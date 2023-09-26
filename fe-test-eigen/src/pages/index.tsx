import { NavLink } from "react-router-dom"
import SectionTitle from "../components/modules/SectionTitle"
import TopHeadline from "../components/pages/home/TopHeadline"
import { Button } from "antd"

const HomePage = () => {
  return (
    <div className="container">
      <SectionTitle
        title="Top Headline"
        subtitle="Top Headline from Eigen News"
        level={2}
      />
      <TopHeadline />
      <NavLink to="/top-headlines">
        <Button type="primary" size="large" block style={{ marginTop: "2rem" }}>See More</Button>
      </NavLink>
    </div>
  )
}

export default HomePage