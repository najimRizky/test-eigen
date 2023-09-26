import { Layout } from "antd"
import "./style.css"

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <div className="container">
        <p>
          Developped by <a href="https://najim-rizky.com" target="_blank">Najim Rizky</a>
        </p>
      </div>
    </Layout.Footer>
  )
}

export default Footer