import {
  createBrowserRouter,
  Link,
  Outlet,
  useRouteError,
} from "react-router-dom";
import Home from "features/misc/pages/Home";
import About from "features/misc/pages/About";
import DarkModeToggle from "components/examples/dark-mode";

function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <DarkModeToggle />
      </nav>
      <Outlet />
    </div>
  );
}

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
