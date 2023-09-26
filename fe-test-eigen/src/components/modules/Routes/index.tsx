import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BaseLayout from "../BaseLayout"
import HomePage from "../../../pages"

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
          path: "everything",
          element: <div>Everything</div>
        },
        {
          path: "top-headlines",
          element: <div>Top Headlines</div>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Routes