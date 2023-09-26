import { Layout, Typography } from "antd"
import "./style.css"

const Footer = () => {
  return (
    <Layout className="footer">
      <Layout.Footer>
        <Typography>
          Developped by <a href="https://najim-rizky.com" target="_blank">Najim Rizky</a>
        </Typography>
      </Layout.Footer>
    </Layout>
  )
}

export default Footer