import { Layout, Menu } from "antd"
import "./style.css"
import { NavLink, useLocation } from "react-router-dom"
import { pageRoutes } from "../../../config/pageRoutes"

const Header = () => {
  const { pathname } = useLocation()
  return (
    <Layout className="navbar" >
      <Layout.Header>
        <nav>
          <NavLink to="/" className="brand">
            Eigen News
          </NavLink>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[pathname]}
            className="menu"
            items={pageRoutes.map((route) => (
              {
                key: route.path,
                label: <NavLink to={route.path}>{route.name}</NavLink>
              }
            ))}
          />
        </nav>
      </Layout.Header>
    </Layout>
  )
}

export default Header