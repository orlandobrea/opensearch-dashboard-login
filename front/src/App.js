import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import LoginCode from "./pages/loginCode";
import LoginLogged from "./pages/loginLogged";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "auth/code",
    element: <LoginCode />,
  },
  {
    path: "dashboard",
    element: <LoginLogged />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
