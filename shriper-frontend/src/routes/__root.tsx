import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />

      <div className="p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
