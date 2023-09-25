import { RouterProvider, createBrowserRouter } from "react-router-dom"
import BaseLayout from "../BaseLayout"

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          index: true,
          element: <div>Home</div>
        },
        {
          path: "about",
          element: <div>About</div>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default Routes