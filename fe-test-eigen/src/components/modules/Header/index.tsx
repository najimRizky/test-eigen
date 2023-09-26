import { Layout, Menu, Drawer, Button } from "antd"
import "./style.css"
import { NavLink, useLocation } from "react-router-dom"
import { pageRoutes } from "../../../config/pageRoutes" 
import { useState } from "react"
import { MenuOutlined } from "@ant-design/icons";

const Header = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <Layout.Header className="navbar">
      <nav className="container">
        <NavLink to="/" className="brand">
          Eigen News
        </NavLink>

        {/* Desktop Mode */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={pageRoutes.map((route) => (
              {
                key: route.path,
                label: <NavLink to={route.path}>{route.name}</NavLink>
              }
            ))}
          />
        </div>

        {/* Mobile Mode */} 
        <Button 
          type="text"
          onClick={() => setOpen(true)}
          className="mobile-menu-button"
        >
          <MenuOutlined />
        </Button>
        <Drawer 
          title="Eigen News"
          placement="right"
          open={open}
          onClose={() => setOpen(false)}
          className="mobile-menu"
        >
          <Menu
            mode="vertical"
            selectedKeys={[pathname]}
            items={pageRoutes.map((route) => (
              {
                key: route.path,
                label: <NavLink to={route.path}>{route.name}</NavLink>
              }
            ))}
          />
        </Drawer>
      </nav>
    </Layout.Header>
  )
}

export default Header