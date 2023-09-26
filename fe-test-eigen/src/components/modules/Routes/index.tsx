import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BaseLayout from "../BaseLayout"
import HomePage from "../../../pages"
import TopHeadlinesPage from "../../../pages/top-headlines"

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
          element: <div>Everything</div>
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Routes