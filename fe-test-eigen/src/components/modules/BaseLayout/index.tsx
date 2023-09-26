import { Outlet } from "react-router-dom"
import Header from "../Header"

const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  )
}

export default BaseLayout