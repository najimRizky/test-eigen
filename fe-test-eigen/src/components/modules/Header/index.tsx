import { Layout, Menu } from "antd"
import "./style.css"
import { NavLink, useLocation } from "react-router-dom"
import { pageRoutes } from "../../../config/pageRoutes"

const Header = () => {
  const { pathname } = useLocation()
  return (
    <Layout.Header className="navbar">
      <nav className="container">
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
  )
}

export default Header