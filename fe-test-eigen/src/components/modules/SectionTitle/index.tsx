import { ISectionTitle } from "./interfaces"
import { Typography } from "antd"
import "./style.css"

const SectionTitle = ({ title, subtitle, level = 2 }: ISectionTitle) => {
  return (
    <div className="section-title">
      <Typography.Title level={level} className="title">
        {title}
      </Typography.Title>
      <Typography.Text className="subtitle">
        {subtitle}
      </Typography.Text>
    </div>
  )
}

export default SectionTitle
