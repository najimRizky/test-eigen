import { Outlet, useLocation } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"
import { useEffect } from "react"

const BaseLayout = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.key])

  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default BaseLayout