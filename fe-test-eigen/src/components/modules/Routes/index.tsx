import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BaseLayout from "../BaseLayout"
import HomePage from "../../../pages/page"
import TopHeadlinesPage from "../../../pages/top-headlines/page"
import EverythingPage from "../../../pages/everything/page"

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "top-headlines",
          element: <TopHeadlinesPage />
        },
        {
          path: "everything",
          element: <EverythingPage />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Routes